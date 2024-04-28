
export type UserDocument = Document & {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type PostDocument = Document & {
    image: string;
    title: string;
    category: string;
    flavors?: string[];
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export type StudentDocument = Document & {
    id: number,
    name: string,
    image: string,
    address: string,
    tel: string,
    course: string[],
    date: string,
    desc: string,
    email: string,
}

type Difficulty = 'easy' | 'intermediate' | 'advanced'

export type CourseDocument = Document & {
    _id: string | number,
    image: string,
    category: string,
    name: string,
    desc: string,
    status: boolean,
    difficulty: Difficulty,

}