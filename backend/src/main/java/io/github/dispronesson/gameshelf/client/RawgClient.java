package io.github.dispronesson.gameshelf.client;

import io.github.dispronesson.gameshelf.dto.RawgGame;
import io.github.dispronesson.gameshelf.dto.RawgGames;
import io.github.dispronesson.gameshelf.dto.RawgScreenshots;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;

@Component
@RequiredArgsConstructor
public class RawgClient {
    private final WebClient webClient;

    public RawgGames getGames(int page, String query) {
        return webClient.get()
                .uri(uri -> {
                    var builder = uri.path("/games");

                    if (query != null) {
                        builder.queryParam("search", query);
                        builder.queryParam("search_precise", true);
                    }

                    builder.queryParam("page", page);

                    return builder.build();
                })
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                        response -> response.bodyToMono(String.class)
                                .map(body -> new RuntimeException("RAWG API error: " + body)))
                .bodyToMono(RawgGames.class)
                .timeout(Duration.ofSeconds(5))
                .block();
    }

    public RawgGame getGame(String idOrSlug) {
        return webClient.get()
                .uri("/games/{idOrSlug}", idOrSlug)
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                        response -> response.bodyToMono(String.class)
                                .map(body -> new RuntimeException("RAWG API error: " + body)))
                .bodyToMono(RawgGame.class)
                .timeout(Duration.ofSeconds(5))
                .block();
    }

    public RawgScreenshots getScreenshots(String idOrSlug, int page) {
        return webClient.get()
                .uri(uri -> uri.path("/games/{idOrSlug}/screenshots")
                        .queryParam("page", page)
                        .build(idOrSlug))
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                        response -> response.bodyToMono(String.class)
                                .map(body -> new RuntimeException("RAWG API error: " + body)))
                .bodyToMono(RawgScreenshots.class)
                .timeout(Duration.ofSeconds(5))
                .block();
    }

}
