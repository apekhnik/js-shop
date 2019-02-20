window.addEventListener('DOMContentLoaded', () => {
const cartWrapper = document.querySelector('.cart__wrapper'),
	cart 		  = document.querySelector('.cart'),
	close 		  = document.querySelector('.cart__close'),
	open 		  = document.querySelector('#cart'),
	goodsBtn 	  = document.querySelectorAll('.goods__btn'),
	products 	  = document.querySelectorAll('.goods__item'),
	confirm 	  = document.querySelector('.confirm'),
	badge 		  = document.querySelector('.nav__badge'),
	totalCost 	  = document.querySelector('.cart__total > span'),
	titles		  = document.querySelectorAll('.goods__title');


	function openCart(){
		cart.style.display = 'block';
		document.body.style.overflow = 'hidden';
	}
	

	function closeCart(){
		cart.style.display = 'none';
		document.body.style.overflow = '';
	}

	open.addEventListener('click', openCart);
	close.addEventListener('click', closeCart);


	


	goodsBtn.forEach(function(btn, i){
		btn.addEventListener('click', ()=>{
			let item 	  = products[i].cloneNode(true),
				trigger   = item.querySelector('button'),
				removeBtn = document.createElement('div'),
				empty 	  = cartWrapper.querySelector('.empty');
				showConfirm();
				calc(1);
				trigger.remove();
				removeBtn.classList.add('goods__item-remove');
				removeBtn.innerHTML = '&times';
				item.appendChild(removeBtn);

				cartWrapper.appendChild(item);
				if(empty){
					empty.remove()
				};

				removeFromCart();
				calcTotal();

		});
	});


	

	function sliceTitle(){
		titles.forEach(function(item){
			if(item.textContent.length < 70){
				return
			}else{
				
				const str = `${item.textContent.slice(0,71)}  ...`;
				item.textContent = str;
				
			}
	});
	}
	sliceTitle();
	





	function showConfirm(){
		confirm.style.display = 'block';
		let counter = 100;
		const id = setInterval(frame,10);
		function frame(){
			if(counter == 10){
				clearInterval(id);
				confirm.style.display = 'none';
			}else{
				counter--;
				confirm.style.transform = `translateY(-${counter}px)`
				confirm.style.opacity = '.' + counter;
			}
		}
	}

	

	function calc(i){
		const items = cartWrapper.querySelectorAll('.goods__item');
		badge.textContent = items.length + i;
	}

	




	function calcTotal(){
		const prices = cartWrapper.querySelectorAll('.goods__price >span');
		let total = 0;
		prices.forEach(function(item){
			total += +item.textContent;
		});
		totalCost.textContent = total;
	}



let newEmp = document.createElement("div");
newEmp.textContent = "Ваша корзина пока пуста";
newEmp.classList.add('empty');
	


	function removeFromCart(){
		const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
		removeBtn.forEach(function(btn){
			btn.addEventListener('click', ()=>{
				btn.parentElement.remove();
				calc(0);
				calcTotal();
				console.log(cartWrapper.querySelectorAll('.goods__price >span').length);
				if(cartWrapper.querySelectorAll('.goods__price >span').length == 0){
					
					cartWrapper.appendChild(newEmp)
				}
			});
		});
		
	}

})
