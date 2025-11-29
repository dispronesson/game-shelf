package io.github.dispronesson.gameshelf.service;

import io.github.dispronesson.gameshelf.client.RawgClient;
import io.github.dispronesson.gameshelf.dto.RawgGame;
import io.github.dispronesson.gameshelf.dto.RawgGames;
import io.github.dispronesson.gameshelf.dto.RawgScreenshots;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RawgService {
    private final RawgClient rawgClient;

    public RawgGames getGames(int page, String query) {
        return rawgClient.getGames(page, query);
    }

    public RawgGame getGame(String idOrSlug) {
        return rawgClient.getGame(idOrSlug);
    }

    public RawgScreenshots getScreenshots(String idOrSlug, int page) {
        return rawgClient.getScreenshots(idOrSlug, page);
    }
}
