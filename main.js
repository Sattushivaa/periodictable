class LayoutBox {
  #boxdesign = {
    width : parseInt(getComputedStyle(document.body).width)/18+'px',
    height : parseInt(getComputedStyle(document.body).width)/18+'px',
    border : '0.5px solid skyblue'
  }
  #node(el){
    return document.createElement(el);
  }
  set boxDesign(design){
    Object.assign(this.#boxdesign,design);
  }
  stack(x,y){
    
  }
  bar(...pattern){
    let container = this.#node('div');
    let height = Math.max(pattern);
    let step = parseInt(this.#boxdesign.height)
    pattern.forEach(bar=>{
      let groupCont = this.#node('div');
      groupCont.style.maxWidth = step + 'px';
      groupCont.style.display = 'inline-block';
      let first = 0;
      for(let i=0;i<bar;i++){
        let box = this.#node('div');
        Object.assign(box.style,this.#boxdesign);
        groupCont.appendChild(box);
        if(i==0) first = box;
      }
      if (bar<height) first.style.marginTop = (height-bar)*step + 'px';
      container.appendChild(groupCont);
    })
    return container;
  }
} 

let layout = new LayoutBox();
const table = layout.bar(7,6,4,4,4,4,4,4,4,4,4,4,6,6,6,6,6,7);
table.className = 'PT';
document.body.appendChild(table);

const detailsCont = document.createElement('div');
detailsCont.id = 'details'
document.body.appendChild(detailsCont);

function filterByGroup(arr){
  let sortedArray = [];
  for(let i=1;i<=18;i++){
    let group = arr.filter(e=>e.group==i&&e.number<=118);
    sortedArray.push(...group);
  }
  return sortedArray;
}


fetch('PeriodicTableJSON.json').then(d=>d.json()).then(data=>{
  let periodic = filterByGroup(data.elements);
  let j=0;
  for(let i=0;i<90;i++){
    table.querySelectorAll("div.PT>div>div")[i].innerText = periodic[j].symbol;
    table.querySelectorAll("div.PT>div>div")[i].addEventListener('click',view.bind(null,periodic[j]));
    if(i==15 || i==16){
      j+=14;
    }
    j++
  }
})

function view(obj){
  detailsCont.innerHTML = `
    <h2 class='tc'>${obj.name}</h2>
    `+/*`<img src='${obj.image.url}'></img> <br/>*/`
    
    <img src='${obj.image.url}'>
    <i class='smlt'>[${obj.image.title}]</i></img> <br/><br/>
    
    <b class='bt'>atomic number :</b> ${obj.number}<br/>
    
    <b class='bt'>atomic mass :</b> ${obj.atomic_mass}<br/>
    
    <b class='bt'>period :</b> ${obj.period}<br/>
    
    <b class='bt'>group :</b> ${obj.group}<br/>
    
    <b class='bt'>electron configuration :</b> <br/>${obj.electron_configuration} <br/>
    
    <b class='bt'>Category :</b> ${obj.category}<br/>
    
    <b class='bt'>appearance :</b> ${obj.appearance}<br/>
    
    <b class='bt'>Phase :</b> ${obj.phase}<br/>
    
    <b class='bt'>boiling point :</b>${obj.boil} K <br/>
    
    <b class='bt'>melting point :</b>${obj.melt} K <br/>
    
    <b class='bt'>density :</b>${obj.density}<br/>
    
    <b class='bt'>molar heat :</b>${obj.molar_heat}<br/>
    
    <b class='bt'>discovered by :</b> ${obj.discovered_by}<br/> 
    
    <b class='bt'>named by :</b> ${obj.named_by}<br/>
    
    <b class='bt'>summary :</b><br/>
    ${obj.summary}  <br/>
    
  `
}