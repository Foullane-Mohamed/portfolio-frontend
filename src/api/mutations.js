

export const LOGIN_MUTATION = `
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const ADD_PROJECT_MUTATION = `
  mutation ($input: ProjectInput!) {
    addProject(input: $input) {
      id
      title
      description
      technologies
      link
    }
  }
`;

export const ADD_COMPETENCE_MUTATION = `
  mutation ($input: CompetenceInput!) {
    addCompetence(input: $input) {
      id
      name
      level
      description
    }
  }
`;

export const ADD_EXPERIENCE_MUTATION = `
  mutation ($input: ExperienceInput!) {
    addExperience(input: $input) {
      id
      title
      company
      startDate
      endDate
      description
    }
  }
`;

