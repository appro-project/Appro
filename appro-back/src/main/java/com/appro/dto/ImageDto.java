package com.appro.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ImageDto {

    private String path;

    private Boolean isMain;

    private Boolean isPhoto;

}
