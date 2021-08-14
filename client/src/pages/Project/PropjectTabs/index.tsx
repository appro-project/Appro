import Tabs from '../../../components/UI/Tabs';
import React from 'react';

const tabNames = [{ label: 'Всё о проекте' },
    { label: 'Планировка' },
    { label: 'Состав проекта' },
    { label: 'Внесение изменений' },
    { label: 'Долнительные услуги' },
    { label: 'Проект в реализации' },
    { label: 'Похожие проекты (3)' },
];

const ProjectTabs = () =>
    <Tabs>
        { tabNames.map((tn, idx) =>
            <div key = { idx } { ...tn }>
                { tn.label  }
            </div>,
        ) }
    </Tabs>;

    export default ProjectTabs;
