package com.appro.service.util;

import com.appro.web.request.FeedbackRequest;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.AbstractMap.SimpleEntry;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@UtilityClass
public class FeedbackFormatter {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    private static final Map<String, Function<FeedbackRequest, String>> FIELD_MAPPERS = new LinkedHashMap<>();
    static {
        FIELD_MAPPERS.put("Имя", FeedbackRequest::name);
        FIELD_MAPPERS.put("Телефон", FeedbackRequest::phone);
        FIELD_MAPPERS.put("Почта", FeedbackRequest::email);
        FIELD_MAPPERS.put("Проект", FeedbackRequest::project);
        FIELD_MAPPERS.put("Дата", feedback -> formatDate(feedback.date()));
        FIELD_MAPPERS.put("Время", feedback -> formatTime(feedback.time()));
        FIELD_MAPPERS.put("Звонить в любое время", feedback -> formatAnyTime(feedback.anyTime()));
        FIELD_MAPPERS.put("Содержание", FeedbackRequest::content);
    }

    private static String formatDate(LocalDate date) {
        return date != null ? date.format(DATE_FORMATTER) : null;
    }

    private static String formatTime(LocalTime time) {
        return time != null ? time.format(TIME_FORMATTER) : null;
    }

    private static String formatAnyTime(Boolean anyTime) {
        return anyTime != null ? (anyTime ? "Да" : "Нет") : null;
    }

    public static String format(FeedbackRequest feedback) {
        return FIELD_MAPPERS.entrySet().stream()
                .map(entry -> new SimpleEntry<>(entry.getKey(), entry.getValue().apply(feedback)))
                .filter(entry -> StringUtils.isNoneBlank(entry.getValue()))
                .map(entry -> entry.getKey() + ": " + entry.getValue())
                .collect(Collectors.joining(StringUtils.LF));
    }
}
