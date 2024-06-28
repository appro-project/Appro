package com.appro.dto;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageInfo {
    private int id;
    private String path;
    private String type;
}
