package com.appro.mapper;

import com.appro.dto.ProjectConfigDto;
import com.appro.entity.ProjectConfig;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectConfigMapper {

      @Mapping(target = "id", ignore = true)
      ProjectConfig toProjectConfig(ProjectConfigDto projectConfig);
}
