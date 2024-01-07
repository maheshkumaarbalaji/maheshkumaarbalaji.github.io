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

function EvaluateNavLinkActiveState()
{
    let sections = document.querySelectorAll(".section");
    let windowHeight = window.innerHeight || document.documentElement.clientHeight;
    let MaximumSpace = -99999;
    let MaximumSpaceElementId = "";

    for(let section of sections)
    {
        let ElementId = section.getAttribute('id');
        let ElementRect = document.getElementById(ElementId).getBoundingClientRect();
        let SpaceInViewPortOccupiedByElement = 0;

        if(ElementRect.top >= 80)
        {
            if(ElementRect.bottom <= windowHeight)
            {
                //This implies that entire section is present within the confines of the window viewport.
                SpaceInViewPortOccupiedByElement = ElementRect.height;
            }
            else
            {
                SpaceInViewPortOccupiedByElement = windowHeight - ElementRect.top;
            }
        }
        else
        {
            if(ElementRect.bottom < 80)
            {
                SpaceInViewPortOccupiedByElement = -999;
            }
            else if(ElementRect.bottom >= 80 && ElementRect.bottom <= windowHeight)
            {
                SpaceInViewPortOccupiedByElement = ElementRect.height - 80;
            }
            else
            {
                SpaceInViewPortOccupiedByElement = windowHeight - 80;
            }
        }

        if(SpaceInViewPortOccupiedByElement > MaximumSpace)
        {
            MaximumSpace = SpaceInViewPortOccupiedByElement;
            MaximumSpaceElementId = ElementId;
        }
    }

    MaximumSpaceElementId = "Nav" + MaximumSpaceElementId;
    let NavigationLinks = document.getElementsByClassName("nav-link");

    for(let link of NavigationLinks)
    {
        if(link.getAttribute('id') === MaximumSpaceElementId)
        {
            if(!link.classList.contains("active"))
            {
                link.classList.add("active");
            }
        }
        else
        {
            if(link.classList.contains("active"))
            {
                link.classList.remove("active");
            }
        }
    }
}

window.onload = function(){
    
    EvaluateNavLinkActiveState();

    document.getElementById("btnNavToContact").addEventListener('click', event => {
        document.getElementById("Contact").scrollIntoView(true);
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

    document.addEventListener("scrollend", event => {
        EvaluateNavLinkActiveState();
    });

    document.getElementById("MenuForMobileBtn").addEventListener('click', event => {
        let OnOrOffMenu = document.getElementById("NavigationMenu").classList.contains("no-display");
        let sections = document.querySelectorAll(".section");

        if(OnOrOffMenu)
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
    });
};