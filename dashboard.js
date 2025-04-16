// Retrieve staffData from localStorage
var staffDataJSON = localStorage.getItem('staffData');
if (staffDataJSON) {
    var staffData = JSON.parse(staffDataJSON);
    populateResume(staffData);
} else {
    alert('No staff data found. Please fill out the form first.');
    window.location.href = 'index.html';
}

// Function to populate the resume template with staff data
function populateResume(data) {
    document.getElementById('staffName').innerText = data.name;
    var positionText = data.position ? data.position : "Staff";
    document.getElementById('staffPosition').innerText = positionText + ", Department of " + data.department;
    document.getElementById('staffStatus').innerText = "Status: " + data.status;
    document.getElementById('staffEmail').innerHTML = "<strong>Email:</strong> " + data.email;
    document.getElementById('staffPhone').innerHTML = "<strong>Phone:</strong> " + data.phone;
    document.getElementById('staffCode').innerHTML = "<strong>Staff Code/ID:</strong> " + (data.staffCode || "N/A");
    document.getElementById('personalStatementContent').innerText = data.personalStatement || "N/A";
    document.getElementById('specializationContent').innerText = data.specialization || "N/A";
    document.getElementById('qualificationContent').innerText = data.qualification || "N/A";
    document.getElementById('degreeContent').innerText = data.degree || "N/A";
    document.getElementById('universityContent').innerText = data.university || "N/A";
    document.getElementById('skillsPercentageContent').innerText = data.skillsPercentage || "N/A";
    document.getElementById('motivationContent').innerText = data.motivation || "N/A";
    document.getElementById('favoriteGroupContent').innerText = data.favoriteGroup || "N/A";
    document.getElementById('favoriteDiscussionContent').innerText = data.favoriteDiscussion || "N/A";
    document.getElementById('bestExperienceContent').innerText = data.bestExperience || "N/A";

    // Set profile photo
    var profilePhoto = document.getElementById('profilePhoto');
    if (data.photo) {
        profilePhoto.src = data.photo;
        profilePhoto.alt = data.name + "'s Profile Picture";
    } else {
        profilePhoto.src = 'default_photo.jpg';
        profilePhoto.alt = 'Default Profile Picture';
    }

    // Populate skills
    var skillsContent = document.getElementById('skillsContent');
    skillsContent.innerHTML = '';
    if (data.skills && data.skills.length > 0) {
        data.skills.forEach(function(skill) {
            var skillSpan = document.createElement('span');
            skillSpan.innerText = skill;
            skillsContent.appendChild(skillSpan);
        });
    } else {
        skillsContent.innerHTML = '<p>No skills listed</p>';
    }

    // Populate hobbies
    var hobbiesContent = document.getElementById('hobbiesContent');
    hobbiesContent.innerHTML = '';
    if (data.hobbies && data.hobbies.length > 0) {
        data.hobbies.forEach(function(hobby) {
            var hobbySpan = document.createElement('span');
            hobbySpan.innerText = hobby;
            hobbiesContent.appendChild(hobbySpan);
        });
    } else {
        hobbiesContent.innerHTML = '<p>No hobbies listed</p>';
    }

    // Populate social media links
    var socialMediaLinks = document.getElementById('socialMediaLinks');
    socialMediaLinks.innerHTML = '';

    if (data.socialMedia) {
        if (data.socialMedia.facebook) {
            var fbLink = document.createElement('a');
            fbLink.href = "https://www.facebook.com/" + data.socialMedia.facebook;
            fbLink.target = "_blank";
            fbLink.innerHTML = '<i class="fab fa-facebook"></i>';
            socialMediaLinks.appendChild(fbLink);
        }
        if (data.socialMedia.twitter) {
            var twitterLink = document.createElement('a');
            twitterLink.href = "https://www.twitter.com/" + data.socialMedia.twitter;
            twitterLink.target = "_blank";
            twitterLink.innerHTML = '<i class="fab fa-twitter"></i>';
            socialMediaLinks.appendChild(twitterLink);
        }
        if (data.socialMedia.instagram) {
            var igLink = document.createElement('a');
            igLink.href = "https://www.instagram.com/" + data.socialMedia.instagram;
            igLink.target = "_blank";
            igLink.innerHTML = '<i class="fab fa-instagram"></i>';
            socialMediaLinks.appendChild(igLink);
        }
        if (data.socialMedia.youtube) {
            var ytLink = document.createElement('a');
            ytLink.href = "https://www.youtube.com/" + data.socialMedia.youtube;
            ytLink.target = "_blank";
            ytLink.innerHTML = '<i class="fab fa-youtube"></i>';
            socialMediaLinks.appendChild(ytLink);
        }
    }

    if (socialMediaLinks.children.length === 0) {
        socialMediaLinks.innerHTML = '<p>No social media links provided</p>';
    }
}

// Function to send the resume data via email using EmailJS
function sendEmail() {
    var emailParams = {
        to_email: 'Saheedkareem815@gmail.com',
        name: staffData.name,
        position: staffData.position,
        department: staffData.department,
        status: staffData.status,
        email: staffData.email,
        phone: staffData.phone,
        staffCode: staffData.staffCode || 'N/A',
        personalStatement: staffData.personalStatement || 'N/A',
        specialization: staffData.specialization || 'N/A',
        qualification: staffData.qualification || 'N/A',
        degree: staffData.degree || 'N/A',
        university: staffData.university || 'N/A',
        skillsPercentage: staffData.skillsPercentage || 'N/A',
        motivation: staffData.motivation || 'N/A',
        favoriteGroup: staffData.favoriteGroup || 'N/A',
        favoriteDiscussion: staffData.favoriteDiscussion || 'N/A',
        bestExperience: staffData.bestExperience || 'N/A',
        welcomeAddress: staffData.welcomeAddress || '',
        skills: staffData.skills.join(', ') || 'N/A',
        hobbies: staffData.hobbies.join(', ') || 'N/A'
    };

    emailjs.send('service_a8qfspj', 'template_q6v3jpm', emailParams)
        .then(function(response) {
            alert('Email sent successfully!');
        }, function(error) {
            alert('Failed to send email. Error: ' + JSON.stringify(error));
        });
}