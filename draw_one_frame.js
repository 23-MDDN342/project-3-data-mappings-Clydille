function draw_one_frame(cur_frac) {
  
	/// BACKGROUND ///
	noStroke()
	fill(219, 161, 161)
	rect(0,0, width, height)
	let rectSize = width / 10
	let spacingSize = width / 9

    ///rects in bg///
	for(let accross = 1; accross +1 < width /spacingSize; accross++ ){
		for(let down = 1; down +1 < height /spacingSize; down++){		
			fill(247, 210, 230)
			rect(spacingSize*accross,spacingSize*down,rectSize/2.9) }
	}


  ////// FLOWERS //////
  
	let flower1_Y = 0.55* height;
	let flower1_Size = height;
	let leafY = height/21
  
  /// Flowers going down ////
  let grid_points1 = [
	  -0.25* width, 
	0.25 * width,
	0.45 * width,
	1 * width
  ]
  
	///flowers going down////
	for(let i=0; i<grid_points1.length; i++) {
	  let cur_x_pos = map(cur_frac, 0, 1, grid_points1[i], grid_points1[i+1]) 
	  //Flowers	  

	  push() 	
	  shadow(cur_x_pos+10, flower1_Y-15, flower1_Size, flower1_Size) ///first flower shadow
	  drawflower2(cur_x_pos, flower1_Y, flower1_Size, flower1_Size)///first flower
	  translate(height/1.8, 0)
	  shadow(cur_x_pos+15, flower1_Y, flower1_Size, flower1_Size) ///second flower shadow
	  drawflower2(cur_x_pos, flower1_Y, flower1_Size, flower1_Size) /// second flower
	  translate(height/1.8, 0)
	  shadow(cur_x_pos+10, flower1_Y+15, flower1_Size/0.7, flower1_Size) ///third flower shadow
	  drawflower2(cur_x_pos, flower1_Y, flower1_Size, flower1_Size) /// third flower
	  pop()

  }
  
	/// Flowers going up ////
	let grid_points2 = [
	  0.90 * width,
	  0.45 * width,
	  0.25 * width, 
	  -0.25* width,
	]
	
	/// Flowers going up ////
	for(let i=0; i<grid_points2.length; i++) {
	  let cur_x_pos = map(cur_frac, 0, 1, grid_points2[i], grid_points2[i+1]) 
  
	  push()
	  translate(height/3.5, width/20)
	  shadow2(cur_x_pos+10, flower1_Y-15, flower1_Size/0.7, flower1_Size) ///first flower shadow
	  drawflower(cur_x_pos, flower1_Y, flower1_Size, flower1_Size) /// first flower
	  translate(height/1.8, 0)
	  shadow2(cur_x_pos+10, flower1_Y+15, flower1_Size/0.7, flower1_Size) /// second flower shadow
	  drawflower(cur_x_pos, flower1_Y, flower1_Size, flower1_Size) /// second flower
	  pop()
	}
	pop()

	  ////// VINES AND LEAF //////
  
	  /// leafs going up ////
	  let grid_points3= [
		2.5* width, 
		1.50 * width,
		0.50 * width,
		-1 * height
	  ]
	  
	  /// LEFT VINE ///
	  for(let i=0; i<grid_points3.length; i++) {
		let cur_x_pos = map(cur_frac, 0, 1, grid_points3[i], grid_points3[i+1]) 
	  
		noStroke()
		 rect(35, 0, 10, height) //stick
		 drawleaf(cur_x_pos*5, leafY, flower1_Size/60, flower1_Size/60) ///left leaf
		 push()
		 translate(40, 125)
		 drawleaf(cur_x_pos*5, leafY, flower1_Size/60, flower1_Size/60) //right leaf
		 pop()
	   
	  }
  
		  /// leafs going down ////
		  let grid_points4= [
			-1* height, 
			0.50 * width,
			1.50 * width,
			2.5* width
		  ]
   
		  /// RIGHT VINE ///
		
	  for(let i=0; i<grid_points4.length; i++) {
		let cur_x_pos = map(cur_frac, 0, 1, grid_points4[i], grid_points4[i+1]) 
		push()
		 translate(width-100, 0)
		 rect(35, 0, 10, height) //stick
		 drawleaf(cur_x_pos*5, leafY, flower1_Size/60, flower1_Size/60) ///left leaf
  
		 push()
		 translate(40, 125)
		 drawleaf(cur_x_pos*5, leafY, flower1_Size/60, flower1_Size/60) //right leaf
		 pop()
		 pop()  
		
	  }

  
  ///Drawing leaf ////
  function drawleaf(height, width){
  
	let leafX = width/29.5
	let leafY = height/21
  
  fill(25, 117, 31) /// green
  strokeWeight(3)
  rect(leafX, leafY, 35, 35, 20); ///leaf
  }
  

  }
    /// Drawing darker flower ////
	function drawflower(height, width) {

	  let flowerW = height/10;
      let flowerH = height/10; 
      let lineWeight = height/135;
	  let elli_size = height/15
	  let flowerX = 0.55*width;
	  let flowerY = 0.55*height;
	  let five =height/10
	  let roundedge = height/27

	  if(roundedge < 0.10){
		roundedge = 10;}
  
	  ///COLOR///
	  let lightred = color(82, 13, 38);
	  let darkred = color(133, 23, 63);
		//// Darker flower ///////
			// flowerPetals
			fill(darkred);
			stroke(lightred);
			strokeWeight(lineWeight);
			rect(flowerX - five, flowerY, flowerW, flowerH, roundedge); // top_leftpetal
			rect(flowerX, flowerY + five, flowerW, flowerH, roundedge); // bottom_rightpetal
			fill(darkred); 
			stroke(lightred);
			strokeWeight(lineWeight);
			rect(flowerX - five, flowerY + five, flowerW, flowerH, roundedge); // bottom_leftpetal
			rect(flowerX, flowerY, flowerW, flowerH, roundedge); // top_rightpetal
		
			//middle part
			fill(249, 255, 87); //colour yellow
			stroke(255, 204, 0); //colour darker yellow
			ellipse(flowerX, flowerY + five, elli_size); //middle
			
		} 

  /// Drawing lighter flower ////
	function drawflower2(height, width) {

      let flowerW = height/10;
	  let flowerH = height/10; 
	  let lineWeight = height/135;
	  let elli_size = height/15
	  let flowerX = 0.55*width;
      let flowerY = 0.55*height;
	  let five =height/10
	  let roundedge = height/27

	  if(roundedge < 0.10){
		roundedge = 10;}
  
	  ///COLOR///
	  let lightorange = color(255, 175, 97)
	  let lightred = color(255, 145, 138);
	  let darkred = color(133, 23, 63);
	  let darkorange = color(145, 69, 15)
  
		//// Lighter flower ///////
			// flowerPetals
			fill(lightorange);
			stroke(darkorange);
			strokeWeight(lineWeight);
			rect(flowerX - five, flowerY, flowerW, flowerH, roundedge); // top_leftpetal
			rect(flowerX, flowerY + five, flowerW, flowerH, roundedge); // bottom_rightpetal
			fill(lightred); 
			stroke(darkred);
			strokeWeight(lineWeight);
			rect(flowerX - five, flowerY + five, flowerW, flowerH, roundedge); // bottom_leftpetal
			rect(flowerX, flowerY, flowerW, flowerH, roundedge); // top_rightpetal
		
			//middle part
			fill(249, 255, 87); //colour yellow
			stroke(255, 204, 0); //colour darker yellow
			ellipse(flowerX, flowerY + five, elli_size); //middle
  
		}

	/// Drawing dark shadow ////
	function shadow2(height, width) {
		
		let flowerW = height/10;
		let flowerH = height/10; 
		let lineWeight = height/135;
		let flowerX = 0.55*width;
		let flowerY = 0.55*height;
		let five =height/10
		let roundedge = height/27

	  if(roundedge < 0.10){
		roundedge = 10;}
		
	
		  //// darker shadow///////
			  // flowerPetals
			  fill(196, 57, 107);
			  stroke(196, 57, 107);
			  strokeWeight(lineWeight);
			  rect(flowerX - five, flowerY, flowerW, flowerH, roundedge); // top_leftpetal
			  rect(flowerX, flowerY + five, flowerW, flowerH, roundedge); // bottom_rightpetal
			  fill(196, 57, 107); 
			  stroke(196, 57, 107);
			  strokeWeight(lineWeight);
			  rect(flowerX - five, flowerY + five, flowerW, flowerH, roundedge); // bottom_leftpetal
			  rect(flowerX, flowerY, flowerW, flowerH, roundedge); // top_rightpetal
	
		  }
	
  
	/// Drawing light shadow ////
	  function shadow(height, width) {

		let flowerW = height/10;
		let flowerH = height/10; 
		let lineWeight = height/135;
		let flowerX = 0.55*width;
		let flowerY = 0.55*height;
		let five =height/10
		let roundedge = height/27

	  if(roundedge < 0.10){
		roundedge = 10;}
		  //// lighter shadow ///////
			  // flowerPetals
			  fill(247, 161, 161);
			  stroke(247, 161, 161);
			  strokeWeight(lineWeight);
			  rect(flowerX - five, flowerY, flowerW, flowerH, roundedge); // top_leftpetal
			  rect(flowerX, flowerY + five, flowerW, flowerH, roundedge); // bottom_rightpetal
			  fill(247, 161, 161); 
			  stroke(247, 161, 161);
			  strokeWeight(lineWeight);
			  rect(flowerX - five, flowerY + five, flowerW, flowerH, roundedge); // bottom_leftpetal
			  rect(flowerX, flowerY, flowerW, flowerH, roundedge); // top_rightpetal
	
		  }
