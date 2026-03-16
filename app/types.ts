export enum Role {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    TENTOR = "TENTOR"
}

export enum ClassProgram {
    UTBK = "UTBK",
    SKD = "SKD"
}

export enum Status {
    INCOMPLETED = "INCOMPLETED",
    COMPLETED = "COMPLETED"
}

export enum Difficulty {
    HARD = "HARD",
    MEDIUM = "MEDIUM",
    EASY = "EASY"
}

export interface Admin {
    idAdmin: number
    uuid: string
    username: string
    password: string
    email: string
    role: Role
    phone_number: string
    created_at: Date
    updated_at: Date
}

export interface User {
    idUser: number
    uuid: string
    userName: string
    password: string
    full_name: string
    email: string
    role: Role
    classId: number
    phone_number: string
    parent_full_name: string
    parent_phone_number: string
    created_at: Date
    updated_at: Date

    class?: Classes
    scores?: Scores[]
    answers?: Answers[]
    attempt?: Attempt[]
}

export interface Classes {
    idClass: number
    uuid: string
    class_name: string
    class_program?: ClassProgram | null
    created_at: Date
    updated_at: Date

    user?: User[]
    subjectClass?: SubjectClass[]
}

export interface Subject {
    idSubject: number
    uuid: string
    subject_name: string
    created_at: Date
    updated_at: Date

    subjectClass?: SubjectClass[]
    quiz?: Quiz[]
}

export interface SubjectClass {
    subjectId: number
    classId: number

    subject?: Subject
    class?: Classes
}

export interface Quiz {
    idQuiz: number
    uuid: string
    quiz_title: string
    quiz_date: Date
    duration: number
    status: Status
    difficulty: Difficulty

    created_by?: number | null
    creator_role?: Role | null

    subjectId?: number | null

    created_at: Date
    updated_at: Date

    subject?: Subject

    scores?: Scores[]
    answers?: Answers[]
    questions?: Questions[]
    attempt?: Attempt[]
}

export interface Attempt {
    idAttempt: number
    userId: number
    quizId: number

    start_time: Date
    finished_time?: Date | null
    isFinished: boolean

    created_at: Date

    user?: User
    quiz?: Quiz
}

export interface Scores {
    idScore: number
    uuid: string
    total_questions: number
    corret: number
    wrong: number
    score: number

    start_time: Date
    finished_time: Date

    created_at: Date
    updated_at: Date

    userId: number
    quizId: number

    user?: User
    quiz?: Quiz
}

export interface Answers {
    idAnswers: number
    uuid: string
    student_answer: string
    answered_at: Date

    quizId: number
    userId: number
    questionsId: number
    optionsId: number

    quiz?: Quiz
    user?: User
    questions?: Questions
    options?: Options
}

export interface Questions {
    idQuestion: number
    uuid: string
    question_text: string
    question_image: string
    difficulty: Difficulty
    poin: number

    quizId: number

    quiz?: Quiz
    options?: Options[]
    answers?: Answers[]
}

export interface Options {
    idOption: number
    uuid: string
    option_text: string
    option_image: string
    is_correct: boolean

    questionsId: number

    questions?: Questions
    answers?: Answers[]
}