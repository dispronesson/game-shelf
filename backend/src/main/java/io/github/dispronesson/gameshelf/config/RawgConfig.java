package io.github.dispronesson.gameshelf.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Configuration
public class RawgConfig {
    @Value("${rawg.api-key}")
    private String apiKey;

    @Bean
    public WebClient rawgWebClient() {
        return WebClient.builder()
                .baseUrl("https://api.rawg.io/api")
                .defaultHeader(HttpHeaders.USER_AGENT, "GameShelf")
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .filter(addKeyAndLoggingFilter())   // ← добавили фильтр
                .build();
    }

    private ExchangeFilterFunction addKeyAndLoggingFilter() {
        return (request, next) -> {
            long startTime = System.currentTimeMillis();

            var originalUri = request.url();
            var newUri = UriComponentsBuilder.fromUri(originalUri)
                    .queryParam("key", apiKey)
                    .build(true)
                    .toUri();

            var newRequest = ClientRequest.from(request)
                    .url(newUri)
                    .build();

            System.out.println("➡️ RAWG REQUEST: " + newRequest.method() + " " + newUri);
            newRequest.headers().forEach((name, values) ->
                    System.out.println("   " + name + ": " + values)
            );

            return next.exchange(newRequest)
                    .doOnNext(response -> {
                        long duration = System.currentTimeMillis() - startTime;

                        System.out.println("⬅️ RAWG RESPONSE: " + response.statusCode());
                        System.out.println("   ⏱ Duration: " + duration + " ms");
                        response.headers().asHttpHeaders().forEach((name, values) ->
                                System.out.println("   " + name + ": " + values)
                        );
                    });
        };
    }
}

