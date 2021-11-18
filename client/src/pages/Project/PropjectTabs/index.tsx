import Tabs from '../../../components/UI/Tabs';
import React, {ReactNode} from 'react';

const tabNames = [ { label: 'Всё о проекте' },
  { label: 'Планировка' },
  { label: 'Состав проекта' },
  { label: 'Внесение изменений' },
  { label: 'Долнительные услуги' },
  { label: 'Проект в реализации' },
  { label: 'Похожие проекты (3)' },
];
interface Props {
  children: ReactNode;
}
const ProjectTabs = (props:Props) =>
  <Tabs>
    { tabNames.map((tn, idx) =>
                     <div key={ idx } { ...tn }>
                       { props.children }
                     </div>,
    ) }
  </Tabs>;

export default ProjectTabs;