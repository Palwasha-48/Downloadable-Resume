document.addEventListener("DOMContentLoaded", function () {
  // Select the form and resume display elements
  const form = document.querySelector('.resume-form') as HTMLFormElement; // Use type assertion
  const resumeDisplay = document.getElementById('resume_display') as HTMLElement; // Use type assertion
  const downloadPdfButton = document.getElementById('downloadpdf') as HTMLButtonElement; // Use type assertion
  const shareButton = document.getElementById('shareable-link') as HTMLButtonElement; // Use type assertion

  // Function to generate resume HTML
  function generateResume(data: {
    name: string;
    fatherName: string;
    phoneNumber: string;
    nic: string;
    email: string;
    nationality: string;
    city: string;
    motherTongue: string;
    religion: string;
    education: string;
    institute: string;
    experience: string;
    skills: string;
  }): string {
    return `
          <section>
              <h1><u>RESUME</u></h1>
              <h2><u>Personal Details</u></h2>
              <p style="font-size: 24px;">Name: ${data.name}</p>
              <p>Father's Name: ${data.fatherName}</p>
              <p>Phone Number: ${data.phoneNumber}</p>
              <p>NIC: ${data.nic}</p>
              <p>Email: ${data.email}</p>
              <p>Nationality: ${data.nationality}</p>
              <p>City: ${data.city}</p>
              <p>Mother Tongue: ${data.motherTongue}</p>
              <p>Religion: ${data.religion}</p>
          </section>
          <section>
              <h2><u>Education</u></h2>
              <p>Qualification: ${data.education}</p>
              <p>Institute: ${data.institute}</p>
          </section>
          <section>
              <h2><u>Experience and Skills</u></h2>
              <p>Experience: ${data.experience}</p>
              <p>Skills: ${data.skills}</p>
          </section>
      `;
  }

  // Handle form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const resumeData = {
      name: formData.get('name') as string,
      fatherName: formData.get('fathername') as string,
      phoneNumber: formData.get('phone') as string,
      nic: formData.get('NIC') as string,
      email: formData.get('mail') as string,
      nationality: formData.get('nationality') as string,
      city: formData.get('city') as string,
      motherTongue: formData.get('mother_tongue') as string,
      religion: formData.get('religion') as string,
      education: formData.get('edu') as string,
      institute: formData.get('institute') as string,
      experience: formData.get('exp') as string,
      skills: formData.get('skills') as string,
    };

    // Generate the resume HTML and display it
    const resumeHtml = generateResume(resumeData);
    resumeDisplay.innerHTML = resumeHtml;

    // Attach the download and share functionalities
    attachDownloadFunctionality(resumeHtml);
    attachShareFunctionality(resumeHtml);
  });

  // Function to download the resume as an HTML file
  function downloadResume(resumeHtml: string) {
    const blob = new Blob([resumeHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html';
    link.click();
    URL.revokeObjectURL(link.href); // Clean up the URL object
  }

  // Function to attach download functionality
  function attachDownloadFunctionality(resumeHtml: string) {
    downloadPdfButton.addEventListener('click', function () {
      downloadResume(resumeHtml);
    });
  }

  // Function to share the resume via email
  function attachShareFunctionality(resumeHtml: string) {
    shareButton.addEventListener('click', function () {
      const subject = "Check out my Resume";
      const body = `Here is my resume:\n\n${resumeHtml}`;
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_blank');
    });
  }
});
