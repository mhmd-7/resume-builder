let experienceCount = 0;
let educationCount = 0;
let languageCount = 0;
let certificateCount = 0;
let projectCount = 0;

// Personal Information Update
document.getElementById('fullName').addEventListener('input', updateCV);
document.getElementById('email').addEventListener('input', updateCV);
document.getElementById('phone').addEventListener('input', updateCV);
document.getElementById('location').addEventListener('input', updateCV);
document.getElementById('address').addEventListener('input', updateCV);
document.getElementById('summary').addEventListener('input', updateCV);
document.getElementById('skills').addEventListener('input', updateCV);

function updateCV() {
  // Update Name
  const fullName = document.getElementById('fullName').value || 'Your Name';
  document.getElementById('previewName').textContent = fullName;

  // Update Contact Info
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const location = document.getElementById('location').value;
  const address = document.getElementById('address').value;
  let contact = [];
  if (email) contact.push(email);
  if (phone) contact.push(phone);
  if (location) contact.push(location);
  if (address) contact.push(address);
  document.getElementById('previewContact').textContent = contact.join(' • ');

  // Update Summary
  const summary = document.getElementById('summary').value;
  if (summary) {
    document.getElementById('previewSummary').style.display = 'block';
    document.getElementById('summaryText').textContent = summary;
  } else {
    document.getElementById('previewSummary').style.display = 'none';
  }

  // Update Skills
  const skills = document.getElementById('skills').value;
  if (skills) {
    document.getElementById('previewSkills').style.display = 'block';
    const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
    const skillsPreview = document.getElementById('skillsPreview');
    skillsPreview.innerHTML = '<div class="skills-grid">' + 
      skillsArray.map(skill => `<span class="skill-tag">${skill}</span>`).join('') + 
      '</div>';
  } else {
    document.getElementById('previewSkills').style.display = 'none';
  }
}

// ===== EXPERIENCE =====
function addExperience() {
  experienceCount++;
  const container = document.getElementById('experienceContainer');
  
  const block = document.createElement('div');
  block.className = 'entry-block';
  block.id = `experience-${experienceCount}`;
  block.innerHTML = `
    <input type="text" placeholder="Job Title" class="input-field exp-title" data-id="${experienceCount}">
    <input type="text" placeholder="Company" class="input-field exp-company" data-id="${experienceCount}">
    <div class="two-column">
      <input type="text" placeholder="From (e.g., Jan 2020)" class="input-field exp-from" data-id="${experienceCount}">
      <input type="text" placeholder="To (e.g., Present)" class="input-field exp-to" data-id="${experienceCount}">
    </div>
    <textarea placeholder="Description" class="input-field exp-desc" data-id="${experienceCount}" rows="3"></textarea>
    <button class="btn-remove" onclick="removeExperience(${experienceCount})">Remove</button>
  `;
  
  container.appendChild(block);
  attachExperienceListeners(experienceCount);
}

function attachExperienceListeners(id) {
  document.querySelector(`.exp-title[data-id="${id}"]`).addEventListener('input', updateExperiencePreview);
  document.querySelector(`.exp-company[data-id="${id}"]`).addEventListener('input', updateExperiencePreview);
  document.querySelector(`.exp-from[data-id="${id}"]`).addEventListener('input', updateExperiencePreview);
  document.querySelector(`.exp-to[data-id="${id}"]`).addEventListener('input', updateExperiencePreview);
  document.querySelector(`.exp-desc[data-id="${id}"]`).addEventListener('input', updateExperiencePreview);
}

function updateExperiencePreview() {
  const preview = document.getElementById('experiencePreview');
  preview.innerHTML = '';
  
  document.querySelectorAll('#experienceContainer .entry-block').forEach((block) => {
    const title = block.querySelector('.exp-title')?.value;
    const company = block.querySelector('.exp-company')?.value;
    const from = block.querySelector('.exp-from')?.value;
    const to = block.querySelector('.exp-to')?.value;
    const desc = block.querySelector('.exp-desc')?.value;
    
    if (title || company) {
      const entry = document.createElement('div');
      entry.className = 'cv-entry';
      entry.innerHTML = `
        <h4>${title}${company ? ` at ${company}` : ''}</h4>
        <p class="info-row"><span>${from || 'Date'}</span> - <span>${to || 'Date'}</span></p>
        ${desc ? `<p>${desc}</p>` : ''}
      `;
      preview.appendChild(entry);
    }
  });
  
  document.getElementById('previewExperience').style.display = preview.children.length > 0 ? 'block' : 'none';
}

function removeExperience(id) {
  document.getElementById(`experience-${id}`).remove();
  updateExperiencePreview();
}

// ===== EDUCATION =====
function addEducation() {
  educationCount++;
  const container = document.getElementById('educationContainer');
  
  const block = document.createElement('div');
  block.className = 'entry-block';
  block.id = `education-${educationCount}`;
  block.innerHTML = `
    <input type="text" placeholder="Degree" class="input-field edu-degree" data-id="${educationCount}">
    <input type="text" placeholder="School/University" class="input-field edu-school" data-id="${educationCount}">
    <input type="text" placeholder="Field of Study" class="input-field edu-field" data-id="${educationCount}">
    <input type="text" placeholder="Graduation Year" class="input-field edu-year" data-id="${educationCount}">
    <button class="btn-remove" onclick="removeEducation(${educationCount})">Remove</button>
  `;
  
  container.appendChild(block);
  attachEducationListeners(educationCount);
}

function attachEducationListeners(id) {
  document.querySelector(`.edu-degree[data-id="${id}"]`).addEventListener('input', updateEducationPreview);
  document.querySelector(`.edu-school[data-id="${id}"]`).addEventListener('input', updateEducationPreview);
  document.querySelector(`.edu-field[data-id="${id}"]`).addEventListener('input', updateEducationPreview);
  document.querySelector(`.edu-year[data-id="${id}"]`).addEventListener('input', updateEducationPreview);
}

function updateEducationPreview() {
  const preview = document.getElementById('educationPreview');
  preview.innerHTML = '';
  
  document.querySelectorAll('#educationContainer .entry-block').forEach((block) => {
    const degree = block.querySelector('.edu-degree')?.value;
    const school = block.querySelector('.edu-school')?.value;
    const field = block.querySelector('.edu-field')?.value;
    const year = block.querySelector('.edu-year')?.value;
    
    if (degree || school) {
      const entry = document.createElement('div');
      entry.className = 'cv-entry';
      entry.innerHTML = `
        <h4>${degree}${field ? ` in ${field}` : ''}</h4>
        <p>${school}${year ? ` (${year})` : ''}</p>
      `;
      preview.appendChild(entry);
    }
  });
  
  document.getElementById('previewEducation').style.display = preview.children.length > 0 ? 'block' : 'none';
}

function removeEducation(id) {
  document.getElementById(`education-${id}`).remove();
  updateEducationPreview();
}

// ===== LANGUAGES =====
function addLanguage() {
  languageCount++;
  const container = document.getElementById('languagesContainer');
  
  const block = document.createElement('div');
  block.className = 'entry-block';
  block.id = `language-${languageCount}`;
  block.innerHTML = `
    <div class="two-column">
      <input type="text" placeholder="Language" class="input-field lang-name" data-id="${languageCount}">
      <select class="input-field lang-level" data-id="${languageCount}">
        <option value="">Proficiency Level</option>
        <option value="Native">Native</option>
        <option value="Fluent">Fluent</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Beginner">Beginner</option>
      </select>
    </div>
    <button class="btn-remove" onclick="removeLanguage(${languageCount})">Remove</button>
  `;
  
  container.appendChild(block);
  attachLanguageListeners(languageCount);
}

function attachLanguageListeners(id) {
  document.querySelector(`.lang-name[data-id="${id}"]`).addEventListener('input', updateLanguagesPreview);
  document.querySelector(`.lang-level[data-id="${id}"]`).addEventListener('change', updateLanguagesPreview);
}

function updateLanguagesPreview() {
  const preview = document.getElementById('languagesPreview');
  preview.innerHTML = '';
  
  document.querySelectorAll('#languagesContainer .entry-block').forEach((block) => {
    const name = block.querySelector('.lang-name')?.value;
    const level = block.querySelector('.lang-level')?.value;
    
    if (name && level) {
      const entry = document.createElement('div');
      entry.className = 'language-item';
      entry.innerHTML = `<span>${name}</span><span>${level}</span>`;
      preview.appendChild(entry);
    }
  });
  
  document.getElementById('previewLanguages').style.display = preview.children.length > 0 ? 'block' : 'none';
}

function removeLanguage(id) {
  document.getElementById(`language-${id}`).remove();
  updateLanguagesPreview();
}

// ===== CERTIFICATES =====
function addCertificate() {
  certificateCount++;
  const container = document.getElementById('certificatesContainer');
  
  const block = document.createElement('div');
  block.className = 'entry-block';
  block.id = `certificate-${certificateCount}`;
  block.innerHTML = `
    <input type="text" placeholder="Certificate Name" class="input-field cert-name" data-id="${certificateCount}">
    <input type="text" placeholder="Issuing Organization" class="input-field cert-org" data-id="${certificateCount}">
    <div class="two-column">
      <input type="text" placeholder="Issue Date" class="input-field cert-date" data-id="${certificateCount}">
      <input type="text" placeholder="Certificate ID (Optional)" class="input-field cert-id" data-id="${certificateCount}">
    </div>
    <button class="btn-remove" onclick="removeCertificate(${certificateCount})">Remove</button>
  `;
  
  container.appendChild(block);
  attachCertificateListeners(certificateCount);
}

function attachCertificateListeners(id) {
  document.querySelector(`.cert-name[data-id="${id}"]`).addEventListener('input', updateCertificatesPreview);
  document.querySelector(`.cert-org[data-id="${id}"]`).addEventListener('input', updateCertificatesPreview);
  document.querySelector(`.cert-date[data-id="${id}"]`).addEventListener('input', updateCertificatesPreview);
  document.querySelector(`.cert-id[data-id="${id}"]`).addEventListener('input', updateCertificatesPreview);
}

function updateCertificatesPreview() {
  const preview = document.getElementById('certificatesPreview');
  preview.innerHTML = '';
  
  document.querySelectorAll('#certificatesContainer .entry-block').forEach((block) => {
    const name = block.querySelector('.cert-name')?.value;
    const org = block.querySelector('.cert-org')?.value;
    const date = block.querySelector('.cert-date')?.value;
    const id = block.querySelector('.cert-id')?.value;
    
    if (name || org) {
      const entry = document.createElement('div');
      entry.className = 'cv-entry';
      entry.innerHTML = `
        <h4>${name}</h4>
        <p>${org}${date ? ` • ${date}` : ''}${id ? ` (ID: ${id})` : ''}</p>
      `;
      preview.appendChild(entry);
    }
  });
  
  document.getElementById('previewCertificates').style.display = preview.children.length > 0 ? 'block' : 'none';
}

function removeCertificate(id) {
  document.getElementById(`certificate-${id}`).remove();
  updateCertificatesPreview();
}

// ===== PROJECTS =====
function addProject() {
  projectCount++;
  const container = document.getElementById('projectsContainer');
  
  const block = document.createElement('div');
  block.className = 'entry-block';
  block.id = `project-${projectCount}`;
  block.innerHTML = `
    <input type="text" placeholder="Project Name" class="input-field proj-name" data-id="${projectCount}">
    <textarea placeholder="Project Description" class="input-field proj-desc" data-id="${projectCount}" rows="3"></textarea>
    <input type="text" placeholder="Technologies Used (comma separated)" class="input-field proj-tech" data-id="${projectCount}">
    <input type="text" placeholder="Project Link/URL (Optional)" class="input-field proj-link" data-id="${projectCount}">
    <button class="btn-remove" onclick="removeProject(${projectCount})">Remove</button>
  `;
  
  container.appendChild(block);
  attachProjectListeners(projectCount);
}

function attachProjectListeners(id) {
  document.querySelector(`.proj-name[data-id="${id}"]`).addEventListener('input', updateProjectsPreview);
  document.querySelector(`.proj-desc[data-id="${id}"]`).addEventListener('input', updateProjectsPreview);
  document.querySelector(`.proj-tech[data-id="${id}"]`).addEventListener('input', updateProjectsPreview);
  document.querySelector(`.proj-link[data-id="${id}"]`).addEventListener('input', updateProjectsPreview);
}

function updateProjectsPreview() {
  const preview = document.getElementById('projectsPreview');
  preview.innerHTML = '';
  
  document.querySelectorAll('#projectsContainer .entry-block').forEach((block) => {
    const name = block.querySelector('.proj-name')?.value;
    const desc = block.querySelector('.proj-desc')?.value;
    const tech = block.querySelector('.proj-tech')?.value;
    const link = block.querySelector('.proj-link')?.value;
    
    if (name) {
      const entry = document.createElement('div');
      entry.className = 'cv-entry';
      entry.innerHTML = `
        <h4>${name}${link ? ` • <a href="${link}" target="_blank">View</a>` : ''}</h4>
        ${desc ? `<p>${desc}</p>` : ''}
        ${tech ? `<p><strong>Tech:</strong> ${tech}</p>` : ''}
      `;
      preview.appendChild(entry);
    }
  });
  
  document.getElementById('previewProjects').style.display = preview.children.length > 0 ? 'block' : 'none';
}

function removeProject(id) {
  document.getElementById(`project-${id}`).remove();
  updateProjectsPreview();
}

// ===== DOWNLOAD & PRINT =====
function downloadCV() {
  const cvContent = document.getElementById('cvPreview').innerHTML;
  const style = `<style>${document.querySelector('style')?.textContent || ''}</style>`;
  const printWindow = window.open('', '', 'height=800,width=900');
  printWindow.document.write('<html><head>' + style + '</head><body style="padding: 20px;">' + cvContent + '</body></html>');
  printWindow.document.close();
  setTimeout(() => printWindow.print(), 250);
}

function printCV() {
  window.print();
}

// Initial update
updateCV();
