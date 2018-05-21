script =
{
    source: "img/",
    img:
    [
        {
            format: "jpg",
            name: "Bancur City",
            source: "https://flaviobolla.deviantart.com/art/OSMADTH-Bancur-City-301830814",
            artist: 1
        },
        {
            format: "png",
            name: "King's Landing",
            source: "https://k04sk.deviantart.com/art/Kings-Landing-364562321",
            artist: 2
        },
        {
            format: "jpg",
            name: "Fortress in the Valley",
            source: "https://gordontarpley.deviantart.com/art/Fortress-in-the-Valley-194414314",
            artist: 3
        }
    ],
    artists:
    [
        {
            name: "Unknown",
            link: "#"
        },
        {
            name: "Flavio Bolla",
            link: "http://flaviobolla.com/",
        },
        {
            name: "Kalen Chock",
            link: "http://kalenart.blogspot.com/",
        },
        {
            name: "Gordon Tarpley",
            link: "https://gordontarpley.deviantart.com/",
        }
    ]
}

var prev = 0;
var idx = 0;

var thumbs;

var next = function()
{
    prev = idx;
    //Advance the index
    idx = (idx + 1 < script.img.length ? idx + 1 : 0);
    //Update the image
    updateImage()
}

var prev  = function()
{
    prev = idx;
    //Advance the index
    idx = (idx - 1 >= 0 ? idx - 1 : script.img.length - 1);
    //Update the image
    updateImage()
}

var gotoImage = function(id = 0)
{
    if(id < 0 && id > script.img.length) return;
    prev = idx;
    idx = id;
    updateImage();
}

var nextRand = function()
{
    prev = idx;
    idx = Math.floor(Math.random() * script.img.length);
    
    updateImage();
}

var updateImage = function()
{
    let main = document.getElementsByClassName("main")[0];
    main.getElementsByTagName("img")[0].src = script.source + idx + '.' + script.img[idx].format;

    main.getElementsByTagName("img")[0].alt = script.img[idx].name;
    main.getElementsByTagName("a")[0].href = script.img[idx].source;

    main.getElementsByClassName("title")[0].textContent = script.img[idx].name;

    main.getElementsByClassName("artist")[0].getElementsByTagName("a")[0].textContent = script.artists[script.img[idx].artist].name;
    main.getElementsByClassName("artist")[0].getElementsByTagName("a")[0].href = script.artists[script.img[idx].artist].link;

    thumbs.getElementsByClassName("thumb")[prev].getElementsByClassName("thumbcontent")[0].classList.remove("active");
    thumbs.getElementsByClassName("thumb")[idx].getElementsByClassName("thumbcontent")[0].classList.add("active");
}

var loaded = function()
{
    var main = document.createElement("div");
    main.classList.add("main");

    var mainImage = document.createElement("div");
    mainImage.classList.add("mainImage");

    var link = document.createElement("a");

    var img = document.createElement("img");
    img.id = "mainImage";

    link.appendChild(img);

    mainImage.appendChild(link);

    main.appendChild(mainImage);

    var imageInfo = document.createElement("div");
    imageInfo.classList.add("imageInfo");

    var title = document.createElement("div");
    title.classList.add("title");

    var artist = document.createElement("div");
    artist.appendChild(document.createElement("a"))
    artist.classList.add("artist");

    imageInfo.appendChild(title);
    // imageInfo.appendChild(document.createTextNode(" by "))
    imageInfo.appendChild(artist);

    main.appendChild(imageInfo);

    thumbs = document.createElement("div");
    thumbs.classList.add("thumbs");
    for(let i = 0; i < script.img.length; i++)
    {
        let element = script.img[i];
        //Create the thumb div
        var node = document.createElement("div");
        node.classList.add("thumb");
        node.addEventListener("click", function()
        {
            gotoImage(i);
        });


        var content = document.createElement("div");
        content.classList.add("thumbcontent");

        var image = document.createElement("img");
        image.src = script.source + i + '.' + element.format;
        image.title = element.name + " by " + script.artists[element.artist].name;
        content.appendChild(image);

        node.appendChild(content);

        thumbs.appendChild(node);
    }

    document.getElementsByTagName('body')[0].appendChild(main);
    document.getElementsByTagName('body')[0].appendChild(thumbs);

    updateImage();
}