package io.github.dispronesson.gameshelf.dto;

import java.util.List;

public record RawgScreenshots(
        Long count,
        String next,
        String previous,
        List<RawgScreenshot> results
) {}
