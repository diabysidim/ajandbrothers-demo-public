
// smooth scrolling to id
$(document).ready(function() {

	$('header a, #welcome a').on('click', function(e) {
	  e.preventDefault();
			  $('html,body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
			  
		
	});	  

	$('.iframe').on('click', function(e){

		console.log('clicked');
		e.preventDefault();
		this.children[0].style.display='none';
		const iframe = document.createElement('iframe');
		iframe.src = this.id;
		iframe.scrolling = "auto";
		iframe.frameborder = "0";
		iframe.width='100%';
		iframe.height = '100%';
		iframe.allow="autoplay; encrypted-media"
		iframe.setAttribute("allowfullscreen",'')	
		this.appendChild(iframe);

		console.log(this)

		$(this).unbind();
		
		console.log($(this));
		});

	});
  
  
  //apply scrolls
  $(window).scroll(function (event) {
	  var scroll = $(window).scrollTop();    
  
	  (scroll>0)? $('header').animate({top: '0'}, 200, 'linear') : $('header').animate({top: '-60px'}, 200, 'linear');	
	  (scroll > $('#about').offset().top && $(window).width() > 900)? $('#aside').animate({left: '20px'}, 200, 'linear') : $('#aside').animate({left: '-150px'}, 100, 'linear');
	  
	  
	   
  });




var imgList = class {

	constructor(img){

		this.img=img;
		this.next =null;
		this.previous=null;
	}

	getImg =() => (this.img);
	getNext = ()=>(this.next);
	setNext =(node) => { this.next =node};
	getPrevious = ()=>(this.previous);
	setPrevious =(node) => { this.previous =node};
	
}

  
  

//Start this baby up

const images = [
	'/assets/img/radio-min.jpg',
	'/assets/img/construction-min.jpg',
	'/assets/img/poster-min.jpg',
	'/assets/img/imga-min.JPG',
	'/assets/img/imgb-min.JPG',
	'/assets/img/imgc-min.JPG',
	'/assets/img/imgd-min.JPG',
	'/assets/img/new-min.jpeg'
];
let leftBtn = document.querySelector('#left');
let featured = document.querySelector('.featured-item');
let rightBtn =document.querySelector('#right');

//initial image
let head = new imgList('url(assets/img/lady-min.jpg)');
let active = head;

//Set Initial Featured Image
	   
let previous, temp =head;
featured.style.backgroundImage = active.getImg();

//Set Images for Gallery and Add Event Listeners
for (let image of images) {
   previous =temp;
   temp.setNext(new imgList('url(' + image + ')'));
   temp = temp.getNext();
   temp.setPrevious(previous);

   
}

temp.setNext(head);
head.setPrevious(temp);



moveLeft = (e) =>{

	active = active.getPrevious();

	console.log('after clicking left the current bg is '+ active.img);

	featured.style.backgroundImage = active.getImg();
	
}

moveRight = (e) =>{

	active = active.getNext();

	console.log('after clicking right the current bg is '+ active.img);

	featured.style.backgroundImage = active.getImg();
	
}


if(leftBtn)leftBtn.addEventListener('click', moveLeft);
if(rightBtn)rightBtn.addEventListener('click', moveRight);





	
	
















	
