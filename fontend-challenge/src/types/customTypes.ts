


export interface LearningPath {
    duration_in_minutes: number;
    firstModuleUrl: string;
    icon_url: string;
    last_modified: string;
    levels: string[];
    locale: string;
    modules: string[];
    number_of_children: number;
    popularity: number;
    products: string[];
    rating: { count: number };
    roles: string[];
    social_image_url: string;
    subjects: string[];
    summary: string;
    title: string;
    type: string;
    uid: string;
    url: string;
}

export interface CatalogList {
    learningPaths: LearningPath[]
}
