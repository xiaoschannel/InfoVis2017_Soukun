// Constructor
Vec3 = function (x,y,z)
{
    this.x = x
    this.y = y
    this.z = z
}

Vec3.prototype.add = function(v)
{
    this.x += v.x
    this.y += v.y
    this.z += v.z    
}

Vec3.prototype.sum = function()
{
    return this.x + this.y + this.z
}

Vec3.prototype.min = function()
{
    return Math.min(this.x, this.y, this.z)
}

Vec3.prototype.max = function()
{
    return Math.max(this.x, this.y, this.z)
}
Vec3.prototype.mid = function()
{
    return Math.max(Math.min(this.x,this.y),Math.min(this.y,this.z),Math.min(this.x, this.z))
}
function heron (a,b,c)
{
    var s=(a+b+c)/2
    return Math.sqrt(s*(s-a)*(s-b)*(s-c))
}

function dist(v1,v2)
{
    return Math.sqrt(Math.pow(v1.x-v2.x,2)+Math.pow(v1.y-v2.y,2)+Math.pow(v1.z-v2.z,2))
}

function AreaOfTriangle(v1,v2,v3)
{
    return heron(dist(v1,v2),dist(v2,v3),dist(v3,v1))
}
