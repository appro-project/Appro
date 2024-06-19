package com.appro.web.request;

import lombok.Data;

import java.util.List;

@Data
public class DeleteImagesRequest {
    List<String> paths;
}
