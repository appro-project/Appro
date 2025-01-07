import { ProjectDto } from "@/api/model";
import i18n from "@/i18n/config";

const ruLang = 'ru';

export const getDescription = (project: ProjectDto) => {
    return i18n.language === ruLang ? project.descriptionRU : project.descriptionUA;
}
