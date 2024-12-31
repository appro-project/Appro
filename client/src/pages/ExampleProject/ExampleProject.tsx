import { Container } from "@/containers/hoc/Container/Container";
import { Breadcrumbs } from '@/components/UI/Breadcrumbs/Breadcrumbs'
import React from "react";

export const ExampleProject = () => {
    return (
        <div>
            <Container>
                <div><Breadcrumbs /></div>
                <div>
                    <h1>Пример проекта</h1>
                </div>
                <div>
                    <h2>Архитектура и констуркции</h2>
                </div>
                <div>
                    <h2>Вода и канализация</h2>
                </div>
                <div>
                    <h2>Отопление и вентиляция</h2>
                </div>
                <div>
                    <h2>Электрика</h2>
                </div>
            </Container>
        </div>
    )
}