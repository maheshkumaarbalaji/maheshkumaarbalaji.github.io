function ResetForm()
{
    document.getElementById("ContactForm").reset();
    let UserDisplayNameControl = document.querySelector("input#UserDisplayName");
    let UserEmailControl = document.querySelector("input#UserEmail");
    let UserMessageControl = document.querySelector("textarea#UserMessage");

    if(UserDisplayNameControl.classList.contains("touched"))
    {
        UserDisplayNameControl.classList.remove("touched");
    }

    if(UserEmailControl.classList.contains("touched"))
    {
        UserEmailControl.classList.remove("touched");
    }

    if(UserMessageControl.classList.contains("touched"))
    {
        UserMessageControl.classList.remove("touched");
    }
}

function ValidateUserDisplayName()
{
    let UserDisplayNameElement = document.querySelector("input#UserDisplayName");
    let validityState = UserDisplayNameElement.validity;
    let ErrorMessages = [];

    if(!validityState.valid)
    {
        if(validityState.valueMissing)
        {
            ErrorMessages.push("'Name' is required.");
        }

        if(validityState.patternMismatch)
        {
            ErrorMessages.push("'Name' can be between 1 and 50 characters long, and can contain only letters and whitespaces.");
        }
        
        document.getElementById("UserDisplayNameError").innerHTML = ErrorMessages.join('<br />');
    }
    else
    {
        document.getElementById("UserDisplayNameError").innerHTML = "";
    }
}

function ValidateUserEmail()
{
    let UserEmailElement = document.querySelector("input#UserEmail");
    let validityState = UserEmailElement.validity;
    let ErrorMessages = [];

    if(!validityState.valid)
    {
        if(validityState.valueMissing)
        {
            ErrorMessages.push("'Email' is required.");
        }

        if(validityState.typeMismatch)
        {
            ErrorMessages.push("Value entered is not in standard email format.");
        }

        document.getElementById("UserEmailError").innerHTML = ErrorMessages.join('<br />');
    }
    else
    {
        document.getElementById("UserEmailError").innerHTML = "";
    }
}

function ValidateUserMessage()
{
    let UserMessageElement = document.querySelector("textarea#UserMessage");
    let validityState = UserMessageElement.validity;
    let ErrorMessages = [];

    if(!validityState.valid)
    {
        if(validityState.valueMissing)
        {
            ErrorMessages.push("'Message' is required.");
        }

        if(validityState.tooLong)
        {
            ErrorMessages.push("'Message' can contain only upto 6000 characters.");
        }

        document.getElementById("UserMessageError").innerHTML = ErrorMessages.join('<br />');
    }
    else
    {
        document.getElementById("UserMessageError").innerHTML = "";
    }
}

function EvaluateControlVisitedState(ElementKey)
{
    let FormInputControl = document.querySelector(ElementKey);
    if(!FormInputControl.classList.contains('touched'))
    {
        FormInputControl.classList.add("touched");
    }
}

function EvaluateSubmitButtonState()
{
    let ContactFormControl = document.querySelector("form#ContactForm");
    let SubmitButtonControl = document.querySelector("button#ContactFormSubmitBtn");

    if(ContactFormControl.checkValidity())
    {
        if(SubmitButtonControl.disabled)
        {
            SubmitButtonControl.removeAttribute("disabled");
        }
    }
    else
    {
        if(!SubmitButtonControl.disabled)
        {
            SubmitButtonControl.setAttribute("disabled",true);
        }
    }
}

function ScrollTo(ElementId)
{
    let HomeHeight = document.getElementById("Home").offsetHeight;
    let AboutMeHeight = document.getElementById("AboutMe").offsetHeight;
    let SkillsHeight = document.getElementById("MySkills").offsetHeight;
    let ProjectsHeight = document.getElementById("Projects").offsetHeight;
    let ScrollHeight = 0;

    if(ElementId === "Home")
    {
        ScrollHeight = 0;
    }
    else if(ElementId === "AboutMe")
    {
        ScrollHeight = HomeHeight;
    }
    else if(ElementId === "MySkills")
    {
        ScrollHeight = HomeHeight + AboutMeHeight;
    }
    else if(ElementId === "Projects")
    {
        ScrollHeight = HomeHeight + AboutMeHeight + SkillsHeight;
    }
    else if(ElementId === "Contact")
    {
        ScrollHeight = HomeHeight + AboutMeHeight + SkillsHeight + ProjectsHeight;
    }

    window.scrollTo(0, ScrollHeight);
}

function ManageMobileNavigationMenu(ToShow)
{
    let sections = document.querySelectorAll(".section");
    
    if(ToShow)
    {
        for(let section of sections)
        {
            let SectionId = section.getAttribute("id");
            document.getElementById(SectionId).classList.add("add-blur");
        }

        document.getElementById("PageFooter").classList.add("add-blur");
        document.getElementById("nabla").classList.remove("no-display");
        document.getElementById("NavigationMenu").classList.remove("no-display");
    }
    else
    {
        for(let section of sections)
        {
            let SectionId = section.getAttribute("id");
            document.getElementById(SectionId).classList.remove("add-blur");
        }

        document.getElementById("PageFooter").classList.remove("add-blur");
        document.getElementById("nabla").classList.add("no-display");
        document.getElementById("NavigationMenu").classList.add("no-display");
    }
}

function setClickHandlersForProjectNav(){
    let ProjectButtons = document.querySelectorAll("button.btn-project");
    for(let index = 0; index < ProjectButtons.length; index++)
    {
        let Element = ProjectButtons[index];
        let Id = Element.id;
        let NavLink = Element.attributes["data-target"].value;
        document.getElementById(Id).addEventListener('click', function(){
            window.open(NavLink, '_blank')
        });
    }
}

window.onload = function(){

    document.getElementById("btnNavToContact").addEventListener('click', event => {
        ScrollTo("Contact");
    });

    document.getElementById("ContactForm").addEventListener('submit',event => {
        event.preventDefault();
        let UserDisplayName = document.getElementById("UserDisplayName").value.trim();
        let UserEmail = document.getElementById("UserEmail").value.trim();
        let UserMessage = document.getElementById("UserMessage").value.trim();
        let EmailSubject = "A Message from " + UserDisplayName + "<" + UserEmail + ">";
        let EmailBody = encodeURIComponent(UserMessage);

        EmailSubject = encodeURIComponent(EmailSubject);
        window.location.href = "mailto:maheshkumaar.balaji@outlook.com?subject=" + EmailSubject + "&body=" + EmailBody;
        ResetForm();
    });

    document.getElementById("btnDownloadResume").addEventListener('click',event => {
        document.getElementById("HiddenDownloadLink").click();
    });

    document.getElementById("MenuForMobileBtn").addEventListener('click', event => {
        let OnOrOffMenu = document.getElementById("NavigationMenu").classList.contains("no-display");
        
        if(OnOrOffMenu)
        {
            ManageMobileNavigationMenu(true);
        }
        else
        {
            ManageMobileNavigationMenu(false);
        }
    });

    document.getElementById("NavigationMenu").addEventListener('click', event => {
        event.stopPropagation();
        let htmlElement = document.getElementsByTagName("html")[0];
        let DeviceSize = getComputedStyle(htmlElement).getPropertyValue("--device-size");

        if(DeviceSize === "medium" || DeviceSize === "small")
        {
            ManageMobileNavigationMenu(false);
        }

        let TargetElementId = event.target.id.replace("Nav", "");
        ScrollTo(TargetElementId);
    });

    setClickHandlersForProjectNav();
};