document.addEventListener("DOMContentLoaded", function () {
    // Select the form and resume display elements
    const form = document.querySelector('.resume-form');
    const resumeDisplay = document.getElementById('resume_display');
    const downloadPdfButton = document.getElementById('downloadpdf');
    const shareButton = document.getElementById('shareable-link');

    // Function to generate resume HTML
    function generateResume(data) {
        return `
            <section>
                <h1><u>RESUME</u></h1>
                <h2><u>Personal Details</u></h2>
                <br>
                <p style="font-size: 27px;">Name: ${data.name}</p>
                <p style="font-size: 20px;">Father's Name: ${data.fatherName}</p>
                <p style="font-size: 20px;">Phone Number: ${data.phoneNumber}</p>
                <p style="font-size: 20px;">NIC: ${data.nic}</p>
                <p style="font-size: 20px;">Email: ${data.email}</p>
                <p style="font-size: 20px;">Nationality: ${data.nationality}</p>
                <p style="font-size: 20px;">City: ${data.city}</p>
                <p style="font-size: 20px;">Mother Tongue: ${data.motherTongue}</p>
                <p style="font-size: 20px;">Religion: ${data.religion}</p>
            </section>
            <section>
                <h3><u>Education</u></h2>
                <br>
                <p style="font-size: 20px;">Qualification: ${data.education}</p>
                <p style="font-size: 20px;">Institute: ${data.institute}</p>
            </section>
            <section>
                <h3><u>Experience and Skills</u></h2>
                <br>
                <p style="font-size: 20px;">Experience: ${data.experience}</p>
                <p style="font-size: 20px;">Skills: ${data.skills}</p>
            </section>
        `;
    }

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const resumeData = {
            name: formData.get('name'),
            fatherName: formData.get('fathername'),
            phoneNumber: formData.get('phone'),
            nic: formData.get('NIC'),
            email: formData.get('mail'),
            nationality: formData.get('nationality'),
            city: formData.get('city'),
            motherTongue: formData.get('mother_tongue'),
            religion: formData.get('religion'),
            education: formData.get('edu'),
            institute: formData.get('institute'),
            experience: formData.get('exp'),
            skills: formData.get('skills'),
        };

        // Generate the resume HTML and display it
        const resumeHtml = generateResume(resumeData);
        resumeDisplay.innerHTML = resumeHtml;

        // Attach the download and share functionalities
        attachDownloadFunctionality(resumeHtml);
        attachShareFunctionality(resumeHtml);
    });

    // Function to download the resume as an HTML file
    function downloadResume(resumeHtml) {
        const blob = new Blob([resumeHtml], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.html';
        link.click();
        URL.revokeObjectURL(link.href); // Clean up the URL object
    }

    // Function to attach download functionality
    function attachDownloadFunctionality(resumeHtml) {
        downloadPdfButton.addEventListener('click', function () {
            downloadResume(resumeHtml);
        });
    }

    // Function to share the resume via email
    function attachShareFunctionality(resumeHtml) {
        shareButton.addEventListener('click', function () {
            const subject = "Check out my Resume";
            const body = `Here is my resume:\n\n${resumeHtml}`;
            const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoLink, '_blank');
        });
    }
});
