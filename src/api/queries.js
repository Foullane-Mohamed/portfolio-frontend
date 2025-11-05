export const GET_EXPERIENCES = `
  {
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

export const GET_COMPETENCES = `
  {
    getCompetences {
      id
      name
      level
      description
    }
  }
`;

export const GET_PROJECTS = `
  {
    getProjects {
      id
      title
      description
      technologies
      link
    }
  }
`;

export const GET_PROFILE = `
  {
    getProfil {
      id
      name
      bio
      email
      socialLinks
    }
  }
`;
