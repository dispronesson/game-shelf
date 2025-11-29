package io.github.dispronesson.gameshelf.dto;

import java.util.List;

public record RawgGames(
    Long count,
    String next,
    String previous,
    List<RawgGame> results
) {}
