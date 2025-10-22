import { layoutRender } from "../script.js";
import { detailpopup } from "./detailpopup.js";

import { ApiKey } from "../info.js";
import { baseUrl } from "../info.js";
import { apiVersion } from "../info.js";

function debounce(fn, delay) {
    let timerId;

    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn(...args);
        }, delay)
    }
}

const searchTrigger = () => {
    if(document.querySelector('.popSearchInp').value.trim() === ""){
        window.location.reload();
        return;
    }else{
        document.querySelector('.filterbtn').dispatchEvent(new Event("click"));
    }
}

const triggerWithDebounce = debounce(searchTrigger, 400)

export function Search() {
    document.querySelector('.filterbtn').addEventListener('click', () => {
        const SearchInputValue = document.querySelector('.popSearchInp').value.replace(/\s+/g, "-").toLowerCase();
        const selectCategory = document.querySelector('select[name="Category"]').value;

        var searchApi;

        if (SearchInputValue.trim() === "" || SearchInputValue === "-") {
            alert("Please Enter Valid Name 🙁");
        } else {
            searchApi = `${baseUrl}/${apiVersion}/search/${selectCategory}?api_key=${ApiKey}&query=${SearchInputValue}`;
            document.querySelector('#mainWrap').style.display = "none";
            document.querySelector('#searchResult').style.display = 'block';

            layoutRender(`${searchApi}`, "searchResult", "Search Result");
            setTimeout(() => {
                detailpopup();
            }, 1000);

            document.querySelector('#photoGallery').innerHTML = "";
            document.querySelector('#videoGallery').innerHTML = "";
            document.querySelector('#innerDetailpage').innerHTML = "";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    Search();
    document.querySelector('.popSearchInp').addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            document.querySelector('.filterbtn').dispatchEvent(new Event("click"));
        }
    })
    document.querySelector(".popSearchInp").addEventListener("input", triggerWithDebounce);
})

