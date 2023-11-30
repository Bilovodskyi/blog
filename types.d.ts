type StylesType = {
    column: string;
    row: string;
    isImage: boolean;
};

type BlogCardType = {
    article: {
        createdAt: any;
        data: InitialDataType;
        id: string;
    };
    styles: StylesType[];
    handleOpen: (id: string) => void;
    index: number;
    isMobile: boolean;
};

type LoadingCardType = {
    styles: StylesType[];
    index: number;
    isMobile: boolean;
};

type CreatorCenterCardType = {
    title: string;
    category: string;
    createdAt: string;
    postId: string;
    deletePost: (postId: string) => void;
    handleOpen: (postId: string) => void;
    handleEdit: (postId: string) => void;
};

type EmptyPageType = {
    title: string;
    subtitle: string;
    isLoggedIn: boolean;
};

type TableBodyType = {
    num: number;
    url: string;
    company: string;
    symbol: string;
    cap: string;
    price: string;
};
x;
type BlogPaginateType = {
    itemsPerPage: number;
    data: DocumentData;
    currentPage: number;
    setCurrentPage: (value: number) => void;
    isMobile: boolean;
};

type UpdateFieldsType = {
    updateFields: (fields: Partial<InitialDataType>) => void;
    article: string | undefined;
};

type StepsProps = Partial<InitialDataType> & {
    currentStepIndex: number;
    next: () => void;
    back: () => void;
    updateFields: (fields: Partial<InitialDataType>) => void;
};

type CreateArticleType = {
    create: (e: FormEvent) => void;
    isEdit: boolean;
};

type InitialDataType = {
    image: string;
    title: string;
    category: string;
    description: string;
    article: string;
};
