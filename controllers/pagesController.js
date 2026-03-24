function renderPage(req, res, view, data = {}) {
  const isPjax = req.get('X-PJAX') === 'true';

  if (isPjax) {
    return res.render(view, {
      ...data,
      layout: false
    });
  }

  return res.render(view, data);
}

exports.index = (req, res) => {
  renderPage(req, res, 'pages/index', { title: 'Home' });
};

exports.about = (req, res) => {
  renderPage(req, res, 'pages/about', { title: 'About' });
};

exports.services = (req, res) => {
  renderPage(req, res, 'pages/services', { title: 'Services' });
};

exports.projects = (req, res) => {
  const projects = [
    {
      name: 'Project One',
      description: 'A web application focused on clean UI and practical user flows.',
      stack: ['Node.js', 'Express', 'EJS'],
      demo: '#',
      repo: '#'
    },
    {
      name: 'Project Two',
      description: 'A backend-oriented system for handling data and API integration.',
      stack: ['Node.js', 'REST API', 'SQLite'],
      demo: '#',
      repo: '#'
    },
    {
      name: 'Project Three',
      description: 'A personal experimental build showcasing frontend interaction and transitions.',
      stack: ['JavaScript', 'CSS', 'PJAX'],
      demo: '#',
      repo: '#'
    }
  ];

  renderPage(req, res, 'pages/projects', {
    title: 'Projects',
    projects
  });
};

exports.contact = (req, res) => {
  renderPage(req, res, 'pages/contact', { title: 'Contact' });
};