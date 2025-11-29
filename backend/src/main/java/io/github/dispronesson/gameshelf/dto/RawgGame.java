package io.github.dispronesson.gameshelf.dto;

import java.time.LocalDate;
import java.util.List;

public record RawgGame(
        Long id,
        String slug,
        String name,
        String description,
        LocalDate released,
        String background_image,
        RawgEsrbRating esrb_rating,
        List<RawgGenre> genres,
        List<RawgPublisher> publishers,
        List<RawgDeveloper> developers,
        List<RawgPlatformObject> platforms,
        List<RawgPlatformWrapper> parent_platforms
) {}
