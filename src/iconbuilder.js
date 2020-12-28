export function createStaticComponent(name, tmpl, style=""){
    const template = document.createElement("template");
    let styelIsTemplate = false;
    if(style instanceof HTMLTemplateElement ) styelIsTemplate = true 
    template.innerHTML = `<style> ${styelIsTemplate ? "" : style} </style> ${tmpl}`;
    
    const t = class extends HTMLElement{
        constructor(){
            super();
            // attach shadow or inherit shadow
            const conf = {mode:'open', delegatesFocus:false} ;
            const shadowRoot = this.attachShadow(conf);
            if(styelIsTemplate)
                shadowRoot.appendChild(style.content.cloneNode(true));
            shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }
    customElements.define(name,t); 
    return t;
}


export const iconStyleTemplate = document.createElement("template");
iconStyleTemplate.innerHTML = `
<style>
:host{
    display:inline;
}
svg{
    height: var(--icon-size,1.2rem);
}
path{
    fill: var(--icon-color,hsl(0, 0%, 41%));
}
:host([color="light"])>svg>path{
    fill: var(--icon-color-light,#dddddd)};
}
:host([color="dark"])>svg>path{
    fill: var(--icon-color-dark,hsl(0, 0%, 41%));
}
:host([color="primary"])>svg>path{
    fill: var(--icon-color-primary,#42c09f);
}
:host([color="secondary"])>svg>path{
    fill: var(--icon-color-secondary,#1982c4);
}
</style>`;
