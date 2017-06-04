var surfaces;
var volume;
var screen;
function main()
{
    volume = new KVS.LobsterData();
    screen = new KVS.THREEScreen();

	screen.init(volume, {width: window.innerWidth * 0.8, height: window.innerHeight,
		targetDom: document.getElementById('display'), enableAutoResize: false});

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = 64;
    surfaces = Isosurfaces( volume, isovalue );
	surfaces.name = "surfaces";
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

	window.addEventListener('resize', function() {
		screen.resize([ window.innerWidth * 0.8, window.innerHeight ]);
	});

    screen.loop();
}
function btnISO_Click()
{
	var obj = screen.scene.getObjectByName("surfaces");
	screen.scene.remove(obj);
	surfaces =  Isosurfaces( volume,Math.round( document.getElementById("isovalue").value*255 ));
	screen.scene.add(surfaces);
	animate();
}
