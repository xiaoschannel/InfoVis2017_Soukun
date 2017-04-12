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

