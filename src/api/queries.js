export const GET_PROJECTS = `
  query {
    getProjects {
      id
      title
      description
      technologies
      link
    }
  }
`;

export const GET_COMPETENCES = `
  query {
    getCompetences {
      id
      name
      level
      description
    }
  }
`;

export const GET_EXPERIENCES = `
  query {
    getExperiences {
      id
      title
      company
      startDate
      endDate
      description
    }
  }
`;

export const GET_PROFILE = `
  query {
    getUser {
      id
      username
      bio
      avatar
      email
    }
  }
`;
export const LOGIN_MUTATION = `
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;


export const REGISTER_MUTATION = `
  mutation ($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`;
