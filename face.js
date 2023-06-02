/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 11;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {  
  

  // these are state variables for a face
  // (your variables should be different!)

  ///colours
  

  this.shroomTop;
  this.eyeColour;
  this.head;
  this.yellow = [186, 162, 41];
  this.darkred = [43, 27, 26];
  this.red = [252, 138, 136]
  this.pink =[247, 225, 220]
  this.cream = [240, 233, 197]
  this.orange =[250, 163, 105]
  this.blue = [125, 156, 209]
  this.green = [178, 209, 125]
  this.lightbrown = [191, 165, 107]

  this.num_eyes = 1.5;   //eye size
  this.top_value = 2;   
  this.mouth_size = 2; 
  this.dot_value = 2; //placements

  this.headSize = 4.5
  this.dot_size = 0
  this.shroomY = 1
  this.shroomRotate = 1

  

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    console.log()
    ///Head Colour///
    this.head = this.darkred
    if(this.headColour <= 2){
      this.head = this.darkred
  } else{
      this.head = this.pink
    }

    // head ///
    noStroke();
    ellipseMode(CENTER);
    fill(this.head);
    ellipse(segment_average(positions.chin)[0], segment_average(positions.chin)[1], this.headSize, this.headSize);

    ////EYE POSITIONS////
    this.R_eyeX = positions.right_eye[0] [0]
    this.R_eyeY = positions.right_eye[0] [1]
    this.L_eyeX = positions.left_eye[0] [0]
    this.L_eyeY = positions.left_eye[0] [1]
   
    ////chaning eye colour////
    this.eyeColour = this.yellow
    if(this.pupilColour <= 25){
      this.eyeColour = this.orange
  } else{
      this.eyeColour = this.lightbrown 
    }

    if(this.pupilColour >= 50){
      this.eyeColour = this.blue 
    } 

    if(this.pupilColour >=75){
        this.eyeColour = this.green
    }
    ////EYES///
    if(this.num_eyes < 2) {
      
      fill(this.eyeColour);
      push()
      translate(0.5, 2)
      ellipse(this.L_eyeX, this.L_eyeY, this.num_eyes-1.8, this.num_eyes-1.8);
      translate(0.5, 0)
      ellipse(this.R_eyeX, this.R_eyeY, this.num_eyes-1.8,this.num_eyes-1.8);
      pop()

    }

     ///mouth
     if(this.mouth_size) {
      push()
      fill(this.red)
      scale(0.3)
      translate(0,5)
      rect(segment_average(positions.bottom_lip)[0], segment_average(positions.top_lip)[1],segment_average(positions.top_lip)[1], this.mouth_size, 1,1 )
       pop()
      } 

    ///SHROOOM TOPSSSS/////
    this.shroomTop = this.orange
    if(this.shroomColour <= 25){
      this.shroomTop = this.orange
  } else{
      this.shroomTop = this.red 
    }

    if(this.shroomColour >= 50){
      this.shroomTop = this.blue 
    } 

    if(this.shroomColour >=75){
        this.shroomTop = this.green
    }
    
    if(this.top_value <= 2) { 
    noStroke();
    rotate(this.shroomRotate)
    push()
    fill(this.shroomTop);
    scale(0.38)
    
    translate(segment_average(positions.chin)[0], this.shroomY)
    beginShape();
    vertex(0, 1);
    bezierVertex(-2, 1, -4.5, 1, -7,0.5);
    bezierVertex(-9, -1, -10, -3, -9.8, -5.5);
    bezierVertex(-9.5, -8, -7.5, -9.5, -4.5, -10.5);
    bezierVertex(-2, -11, 0, -11.2, 4.5, -10.5);
    bezierVertex(7.5, -9.5, 9.5, -8, 9.8, -5.5);
    bezierVertex(10, -3, 9, -1, 7, 0.5);
    bezierVertex(4.5, 1, 2, 1, 0, 1);
    endShape();
    
    //dots
    //left 
    fill(this.cream)//255, 197, 196
    ellipse(-1, this.dot_value -10.5, this.dot_size -3, this.dot_size -3) /// left little near big right dot
    ellipse(this.dot_value, this.dot_value-8, this.dot_size -1 , this.dot_size -1 ) /// bottom left dot
    
   ellipse(-5.9, -3, this.dot_size, this.dot_size) /// first left dot
   ellipse(-5.5, this.dot_value-7, this.dot_size -2.5, this.dot_size -2.5) /// top left dot
    ///right
     ellipse(2, -3, this.dot_size +2.5, this.dot_size +2.5) /// right big dot
     ellipse(5, -6, this.dot_size, this.dot_size) /// right big dot
     ellipse(7, -1, this.dot_size -3, this.dot_size -3) ///  last right big dot
    pop()

    }
  else{

  fill(this.shroomTop) /// red
  push()
  scale(0.34)
  rotate(this.shroomRotate)
  translate(segment_average(positions.chin)[0], this.shroomY)
  rect(-10, -10, 20, 12, this.top_value + 3, this.top_value + 3,  this.top_value -1,  this.top_value-1);

      //dots
       ///left
       fill(255, 197, 196)//255, 197, 196
       ellipse(-1, this.dot_value -10, 2, 2) /// left little near big right dot
       ellipse(this.dot_value, -7, 1, 1) /// bottom left dot
       ellipse(-5.9, this.dot_value -5, 2, 2) /// top left dot
       
        ///right
        ellipse(2, -3, this.dot_size +2.5, this.dot_size +2.5) /// right big dot
        ellipse(5, -6, this.dot_size, this.dot_size) /// right big dot
        ellipse(7, -1, this.dot_size -3, this.dot_size -3) ///  last right big dot
      pop()
    }
  

  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.num_eyes = map(settings[0], 0, 100, 1, 2);
    this.top_value = map(settings[1], 0, 100, 1, 6);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 3);
    this.dot_value = map(settings[3], 0, 100, 1, 5);
    this.headSize = map(settings[4], 0, 100, 3.5, 5);
    this.shroomY = map(settings[5], 0, 100, 0, 6);
    this.dot_size = map(settings[6], 0, 100, 1, 5)
    this.shroomRotate = map(settings[7], 0, 100, 1, 50)
    this.shroomColour = map(settings[8], 0, 100, 1, 100)
    this.pupilColour = map(settings[9], 0, 100,1,100)
    this.headColour = map(settings[10], 0, 100,1,4)
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(8);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.top_value,1, 6, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 3, 0, 100);
    settings[3] = map(this.dot_value, 3, 5, 0, 100);
    settings[4] = map(this.headSize, 3.5, 5, 0, 100);
    settings[5] = map(this.shroomY, 0, 6, 0, 100);
    settings[6] = map(this.dot_size, 0.5, 5, 0, 100)
    settings[7] = map(this.shroomRotate, 1, 50, 0, 100)
    settings[8] = map(this.shroomColour, 1, 100, 0, 100)
    settings[9] = map(this.pupilColour, 1, 100, 0, 100)
    settings[9] = map(this.headColour, 1, 4, 0, 100)
    return settings;
  }
}
