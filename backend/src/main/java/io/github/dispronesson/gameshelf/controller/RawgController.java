package io.github.dispronesson.gameshelf.controller;

import io.github.dispronesson.gameshelf.dto.RawgGame;
import io.github.dispronesson.gameshelf.dto.RawgGames;
import io.github.dispronesson.gameshelf.dto.RawgScreenshots;
import io.github.dispronesson.gameshelf.service.RawgService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RawgController {
    private final RawgService rawgService;

    @GetMapping("/games")
    public RawgGames getGames(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) String query
    ) {
        return rawgService.getGames(page, query);
    }

    @GetMapping("/games/{idOrSlug}")
    public RawgGame getGame(@PathVariable String idOrSlug) {
        return rawgService.getGame(idOrSlug);
    }

    @GetMapping("/games/{idOrSlug}/screenshots")
    public RawgScreenshots getScreenshots(
            @PathVariable String idOrSlug,
            @RequestParam(defaultValue = "1") int page
    ) {
        return rawgService.getScreenshots(idOrSlug, page);
    }
}
