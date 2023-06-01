/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 6;

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
function Face(facecolor_value, eyecolor_value, top_value, dot_value) {  
  

  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [204, 136, 17];
  this.yellow = [186, 162, 41];
  this.darkred = [43, 27, 26];
  this.red = [252, 138, 136]
  this.cream = [240, 233, 197]
  this.orange =[250, 163, 105]
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.top_value = 1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8
  this.dot_value = 2;

  this.chinColour = [153, 153, 51]
  this.lipColour = [136, 68, 68]
  this.eyebrowColour = [119, 85, 17]


  this.headSize = 4.5
  this.eyeSize = 0;
  this.centerX = 0;
  this.Iy = 0

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    console.log()
    // head
    ellipseMode(CENTER);
    stroke(stroke_color);
    fill(this.darkred);
    ellipse(segment_average(positions.chin)[0], segment_average(positions.chin)[0], this.headSize, this.headSize);
    noStroke();

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    // eyes
    noStroke();
    if(this.num_eyes == 2) {
      fill(this.yellow);
      push()
      translate(0.2, 2)
      ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, 0.5);
      translate(0.5, 0)
      ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.5);
      pop()

    }
    else {

      fill(this.cream);
      push()
      translate(left_eye_pos[1], 2)
      ellipse(left_eye_pos[1], left_eye_pos[1], 0.5, 0.5);
      translate(0.5, 0)
      ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.5);
      pop()

    }

    ///top
   
    if(this.top_value == 2) { 
    noStroke();
    fill(this.orange);
 
    push()
    scale(0.4)
    translate(segment_average(positions.chin)[0], segment_average(positions.chin)[0])
    beginShape();
    vertex(0, 1);
    bezierVertex(-2, 1, -4.5, 1, -7, 0.5);
    bezierVertex(-9, -1, -10, -3, -9.8, -5.5);
    bezierVertex(-9.5, -8, -7.5, -9.5, -4.5, -10.5);
    bezierVertex(-2, -11, 0, -11.2, 4.5, -10.5);
    bezierVertex(7.5, -9.5, 9.5, -8, 9.8, -5.5);
    bezierVertex(10, -3, 9, -1, 7, 0.5);
    bezierVertex(4.5, 1, 2, 1, 0, 1);
    endShape();
    pop()
    }
  else{

  fill(this.red) /// red
  scale(0.3)
  translate(segment_average(positions.chin)[1],0)
  rect(-10, -10, 20, 12, 5, 5, 1, 1);

    }
    
    //dots
    if(this.dot_value == 2){

      //shroomhead Top Dots
       ///left 
       scale(0.5)
       fill(this.orange) /// lighter orange 255, 197, 196
       ellipse(-1, this.dot_value, 2, 2) /// left little near big right dot
       ellipse(-6, this.dot_value + 5, 1.5, 1.5) /// bottom left dot
       ellipse(-5.9, this.dot_value +3, 1.5, 1.5) /// bottom left dot
     
       ///right
       ellipse(3, this.dot_value +2, 2, 2) /// right big dot
       ellipse(7, -6, 2, 2) /// right big dot
     }
     
     else{
      //shroomhead Top Dots
      ///left
      scale(1)
     fill(this.orange)//255, 197, 196
     ellipse(-1, this.dot_value -10, 2, 2) /// left little near big right dot
     ellipse(this.dot_value, -7, 1, 1) /// bottom left dot
     ellipse(-5.9, this.dot_value -5, 2, 2) /// top left dot
     
      ///right
       ellipse(2, this.dot_value -4, 5, 5) /// right big dot
       ellipse(5, -6, 2, 2) /// right big dot
       ellipse(7, -1, 2, 2) /// right big dot
     }

     ///mouth
     if(this.mouth_size == 0.5) {
     translate(segment_average(positions.bottom_lip)[0],5)
     rect(segment_average(positions.bottom_lip)[0], segment_average(positions.top_lip)[0],this.mouth_size, segment_average(positions.top_lip)[0] )
     } else{
       translate(segment_average(positions.bottom_lip)[0],5)
      rect(segment_average(positions.bottom_lip)[0], segment_average(positions.top_lip)[0],this.mouth_size, this.mouth_size)
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
    this.num_eyes = int(map(settings[0], 0, 100, 1, 5));
    this.top_value = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 3);
    this.dot_value = map(settings[3], 0, 100, 1, 5);
    this.headSize = map(settings[4], 0, 100, 3.5, 5);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(6);
    settings[0] = map(this.num_eyes, 1, 5, 0, 100);
    settings[1] = map(this.top_value, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 3, 0, 100);
    settings[3] = map(this.dot_value, 3, 5, 0, 100);
    settings[4] = map(this.headSize, 3.5, 5, 0, 100);
    return settings;
  }
}
