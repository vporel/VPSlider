
//Plug-in constants

const VPS_NORMAL_SPEED = 0.6, VPS_SLOW_SPEED = 1, VPS_FAST_SPEED = 0.3;

//Controls
const VPS_CONTROLS_PREV_CODE = "&#10094",
	VPS_CONTROLS_NEXT_CODE = "&#10095";


//Directions
const VPS_FORWARD = "forward",
	VPS_BACKWARD = "backward";

(function($){
	$.fn.VPSlider = function(opt){

		let defaults = {
			number:3,
			speed:VPS_NORMAL_SPEED
		};

		let options = $.extend(true, defaults, opt);
		//Checking the integrity of the parameters
		options.speed = options.speed*1000;
		//End checking
		this.each(function(){
			let $obj = $(this), timer;
			/*

					Définitions des éléments

			*/
			//Update object data
			$obj.addClass('vpslider-frame');
			$obj.find('.vpslider-element').wrapAll('<div class="vpslider-elements"></div>');
			$obj.find('.vpslider-element').wrap('<div class="vpslider-element-container"></div>');
			let $elementsDivs = $obj.find('.vpslider-element-container');
			$(".vpslider-elements", $obj).wrap('<div class="vpslider-container"></div>');

			let $container = $obj.find('.vpslider-container'),
				$elements = $obj.find('.vpslider-elements'),
				currentElementIndex = 0,
				lastElementIndex = $elementsDivs.length - 1;

			//Controls buttons
			let controls_code = '<span class="vpslider-prev vpslider-control">'+VPS_CONTROLS_PREV_CODE+'</span><span class="vpslider-control vpslider-next">'+VPS_CONTROLS_NEXT_CODE+'</span>';
			$container.append(controls_code);

			/*
				Style
			*/
			$elementsDivs.css({"width":(100/$elementsDivs.length)+"%"})
			$elements.css({"width":((100/options.number)*$elementsDivs.length)+"%"})

			/*
				ACTIONS
			*/
			$container.find('.vpslider-prev').click(function(){changeElement(VPS_BACKWARD);});
			$container.find('.vpslider-next').click(function(){changeElement(VPS_FORWARD);});

			function changeElement(dir, nextElementIndex = -1)
			{
				console.log(currentElementIndex,$elementsDivs.length, options.number);
				if(nextElementIndex == -1){
					if(dir == VPS_FORWARD && currentElementIndex >= ($elementsDivs.length - options.number)){
						nextElementIndex = 0;
					}else if(dir == VPS_BACKWARD && currentElementIndex <= 0){
						nextElementIndex = $elementsDivs.length - options.number;
					}else{
						nextElementIndex = currentElementIndex+1;
						if(dir == VPS_BACKWARD){
							nextElementIndex = currentElementIndex-1;
							if(nextElementIndex < 0){
								nextElementIndex = lastElementIndex;
							}
						}
						if(dir == VPS_FORWARD && nextElementIndex > lastElementIndex){
							nextElementIndex = 0;
						}
					}
				}
				$elements.animate({
					left:'-'+(nextElementIndex*(100/options.number))+'%'
				}, options.speed);
				currentElementIndex = nextElementIndex;
				
			}
		});
		return this;
	}
})(jQuery);