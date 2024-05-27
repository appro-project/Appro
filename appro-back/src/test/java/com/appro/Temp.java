package com.appro;

import com.appro.entity.project_options.InsulationOptions;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class Temp {


    @Test
    public void testDeserialization() throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        String json = "\"минеральная вата\"";
        InsulationOptions option = mapper.readValue(json, InsulationOptions.class);

        assertEquals(InsulationOptions.MINERAL_WOOL, option);
    }
}
