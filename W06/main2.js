var scene = new THREE.Scene();
var camera;
var mesh;
var renderer = new THREE.WebGLRenderer();

function main()
{
	var width = 500;
	var height = 500;
	
	var fov = 45;
	var aspect = width / height;
	var near = 1;
	var far = 1000;
	camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 0, 5 );
	camera.lookAt(new THREE.Vector3(0,0,0));
	scene.add( camera );
	
	renderer.setSize( width, height );
	document.body.appendChild( renderer.domElement );
	
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.set( 5, 2, 3 ).normalize();
	scene.add( directionalLight );
	
	var light = new THREE.AmbientLight( 0x202020 ); // soft white light
	scene.add( light );
	
	var material = new THREE.MeshToonMaterial({specular:0xffffff, shininess:50, color:0x66ccff,shading: THREE.SmoothShading})
	material.vertexColors = THREE.VertexColors;
	// my code here
	mesh = cube(material);
	scene.add(mesh)
	
	//for fun!
	//Create outline object
	var outline_geo = new THREE.BoxGeometry(1, 1, 1);
	//Notice the second parameter of the material
	var outline_mat = new THREE.MeshBasicMaterial({color : 0x00ff00, side: THREE.BackSide});
	var outline = cube(outline_mat);
	//Scale the object up to have an outline (as discussed in previous answer)
	outline.scale.multiplyScalar(1.05);
	scene.add(outline);
	
	loop();
	
	var t=750
	function loop()
	{
		requestAnimationFrame( loop );
		camera.position.set( Math.sin(5*t/1000)*5, 2, Math.cos(5*t/1000)*5);
		camera.lookAt(new THREE.Vector3(0,0,0));
		renderer.render( scene, camera );
		t+=1
	}
}

function mouse_down_event( event )
{
	var x_win = event.clientX;
	var y_win = event.clientY;
	
	var vx = renderer.domElement.offsetLeft;
	var vy = renderer.domElement.offsetTop;
	var vw = renderer.domElement.width;
	var vh = renderer.domElement.height;
	var x_NDC = 2 * ( x_win - vx ) / vw - 1;
	var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );
	
	var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
	var p_wld = p_NDC.unproject( camera );

	var origin = camera.position;
	var direction = p_wld.normalize();
	var raycaster = new THREE.Raycaster( origin, direction );
	
	var intersects = raycaster.intersectObject( mesh );
	if ( intersects.length > 0 )
	{
		intersects[0].face.color.setRGB( 1, 0.1, 0.1 );
		intersects[0].object.geometry.colorsNeedUpdate = true;
	}
}

function cube(material)
{
	g = new THREE.Geometry()
	
	g.vertices.push( new THREE.Vector3(-1, 1, 1) )
	g.vertices.push( new THREE.Vector3(1, 1, 1) )
	g.vertices.push( new THREE.Vector3(-1, -1, 1) )
	g.vertices.push( new THREE.Vector3(1, -1, 1) )
	g.vertices.push( new THREE.Vector3(-1, 1, -1) )
	g.vertices.push( new THREE.Vector3(1, 1, -1) )
	g.vertices.push( new THREE.Vector3(-1, -1, -1) )
	g.vertices.push( new THREE.Vector3(1, -1, -1) )
	
	var ful = 0  //too much of a brainfuck without renaming things
	var fur = 1
	var fll = 2
	var flr = 3
	var bul = 4
	var bur = 5
	var bll = 6
	var blr = 7
	
	face(g,ful,fur,fll,flr)
	face(g,bul,ful,bll,fll)
	face(g,bul,bur,ful,fur)
	face(g,fur,bur,flr,blr)
	face(g,fll,flr,bll,blr)
	face(g,bur,bul,blr,bll)
	
	g.computeFaceNormals();
	return new THREE.Mesh(g,material)
}

function face(g,ul,ur,ll,lr)
{
	triangle(g,ul,ll,ur),triangle(g,ur,ll,lr)
}

function triangle(g,v1,v2,v3)
{
	g.faces.push( new THREE.Face3( v1,v2,v3 ) )
}