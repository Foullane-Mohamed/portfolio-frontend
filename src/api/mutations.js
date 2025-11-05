export const LOGIN = `
mutation ($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}`;

export const ADD_EXPERIENCE = `
mutation ($input: ExperienceInput!) {
  addExperience(input: $input) {
    id
    title
  }
}`;

export const UPDATE_EXPERIENCE = `
mutation ($id: ID!, $input: UpdateExperienceInput!) {
  updateExperience(id: $id, input: $input) {
    id
    title
  }
}`;

export const DELETE_EXPERIENCE = `
mutation ($id: ID!) {
  deleteExperience(id: $id) {
    id
    title
  }
}`;


export const ADD_COMPETENCE = `
mutation ($input: CompetenceInput!) {
  addCompetence(input: $input) {
    id
    name
    level
    description
  }
}`;

export const UPDATE_COMPETENCE = `
mutation ($id: ID!, $input: UpdateCompetenceInput!) {
  updateCompetence(id: $id, input: $input) {
    id
    name
    level
    description
  }
}`;

export const DELETE_COMPETENCE = `
mutation ($id: ID!) {
  deleteCompetence(id: $id) {
    id
    name
  }
}`;

export const ADD_PROJECT = `
mutation ($input: ProjectInput!) {
  addProject(input: $input) {
    id
    title
    description
    technologies
    link
  }
}`;

export const UPDATE_PROJECT = `
mutation ($id: ID!, $input: UpdateProjectInput!) {
  updateProject(id: $id, input: $input) {
    id
    title
    description
    technologies
    link
  }
}`;

export const DELETE_PROJECT = `
mutation ($id: ID!) {
  deleteProject(id: $id) {
    id
    title
  }
}`;

export const ADD_PROFILE = `
mutation ($input: ProfileInput!) {
  addProfile(input: $input) {
    id
    name
    bio
    email
    socialLinks
  }
}`;

export const UPDATE_PROFILE = `
mutation ($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    name
    bio
    email
    socialLinks
  }
}`;
