//Project Management
 class ProjectState{
     private projects: any[] = [];
     private static instance: ProjectState;
     private listeners: any[] = [];

     private constructor(){

     }

     static getInstance(){
         
       if(this.instance){
           return this.instance;
       }

       this.instance = new ProjectState();
       return this.instance;
     }

     addProject(title: string, description: string, numOfPeople: number){
         const newProject = {
             id: Math.random().toString(),
             title: title,
             description: description,
             numOfPeople: numOfPeople
         };

         this.projects.push(newProject);

         for(const listenerFn of this.listeners){
            listenerFn(this.projects.slice());
         }
     }


     addListener(listenerFn: Function){
         this.listeners.push(listenerFn);
     }

 }


 const projectState = ProjectState.getInstance();

//Validation

interface validatable{
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}


function validate(validatableInput: validatable){
  let isValid = true;

  if(validatableInput.required){
      isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if(validatableInput.minLength != null && typeof(validatableInput.value) === 'string'){
      isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
  }

  if(validatableInput.maxLength != null && typeof(validatableInput.value) === 'string'){
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
}


  return isValid;
}


class ProjectList{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: any[] = [];

    constructor(private type: 'active' | 'finished'){
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement =  document.getElementById('app')! as HTMLDivElement;
        this.assignedProjects = [];

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id =`${this.type}-projects`;

        projectState.addListener((projects: any[]) =>{
          this.assignedProjects = projects;
          this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }

    private renderProjects(){
      const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;

      for(const prjItem of this.assignedProjects){
        const listItem = document.createElement('li');
        listItem.textContent = prjItem.title;
        listEl.appendChild(listItem);
      }
    };

    private attach(){
        this.hostElement.insertAdjacentElement('beforeend',this.element);
    }

    private renderContent(){
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
    }
}

class ProjectInput{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement =  document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id ='user-input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        
        this.configure();
        this.attach();

    }

    private submitHandler(event: Event){
      event.preventDefault();
      const userInput = this.fetchUserInput();
      
      if(Array.isArray(userInput)){
          const [title, description, people] = userInput;

          projectState.addProject(title, description, people);

          console.log(title, description, people);
          this.clearInputs();
      }

    }

    private fetchUserInput(): [string, string, number] | void {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const people = this.peopleInputElement.value;
        
        const titleValidatable = {
            value: title,
            required: true,
        }

        const descriptionValidatable = {
            value: title,
            required: true,
            minLength: 5
        }

        const peopleValidatable = {
            value: +people,
            required: true,
        }
        if(!validate(titleValidatable) || 
           !validate(descriptionValidatable) ||
           !validate(peopleValidatable)){
             alert("Invalid input, please try again later!");
            return;
        }
        else{
            return [title, description, +people];
        }

    }

    private configure(){
        this.element.addEventListener('submit',this.submitHandler.bind(this));
    }

    
    private attach() {
      this.hostElement.insertAdjacentElement('afterbegin',this.element);
    }

    private clearInputs(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
}


const projInput = new ProjectInput();
const activeProjList = new ProjectList('active');
const finishedProjList = new ProjectList('finished');