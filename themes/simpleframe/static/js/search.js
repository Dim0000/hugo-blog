function search(query) {
  const result = searchData(query);
  const html = createHtml(result);
  showResult(html);
  showResultCount(result.length, data.length);
}

function searchData(query) {

  const result = [];

  query = query.trim();
  if (query.length < 1) {
    return result;
  }
  const re = new RegExp(query, 'i');
  for (let i = 0; i < data.length; ++i) {
    const pos = data[i].body.search(re);
    if (pos != -1) {
      result.push([i, pos, pos + query.length]);
    }
  }
  return result;
}

function createHtml(result) {
  const htmls = [];
  for (let i = 0; i < result.length; ++i) {
    const dataIndex = result[i][0];
    const startPos = result[i][1];
    const endPos = result[i][2];
    const url = data[dataIndex].url;
    const title = data[dataIndex].title;
    const body = data[dataIndex].body;
    htmls.push(createEntry(url, title, body, startPos, endPos));
  }
  return htmls.join('');
}

function createEntry(url, title, body, startPos, endPos) {
  const template = document.getElementById("search-item-template");
  const clone = template.content.cloneNode(true);

  const link = clone.querySelector(".search__item__title");
  link.href = url;
  link.textContent = title;

  const excerptEl = clone.querySelector(".search__item__excerpt");
  excerptEl.innerHTML = excerpt(body, startPos, endPos);

  const wrapper = document.createElement('div');
  wrapper.appendChild(clone);
  return wrapper.innerHTML;
}

function excerpt(body, startPos, endPos) {
  return [
    body.substring(startPos - 30, startPos),
    '<b>', body.substring(startPos, endPos), '</b>',
    body.substring(endPos, endPos + 200)
  ].join('');
}

function showResult(html) {
  const el = document.getElementById('searchResult');
  el.innerHTML = html;
}

function showResultCount(count, total) {
  const el = document.getElementById('searchResultCount');
  el.innerHTML = '<b>' + count + '</b> result(s) found (out of ' + total + ')';
}