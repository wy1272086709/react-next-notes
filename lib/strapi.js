console.log('STRAPI_KEY', process.env.STRAPI_KEY)
export async function getAllNotes() {
    const response = await fetch(`http://localhost:1337/api/notes`, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${process.env.STRAPI_KEY}`,
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    const res = {};
    console.log('data', data)
    data?.data?.forEach(({ id, title, content, slug, updatedAt }) => {
        res[slug] = JSON.stringify({
            id,
            title,
            content,
            updateTime: updatedAt
        })
    });
    return res;
}

export async function addNote(data) {
    const response = await fetch(`http://localhost:1337/api/notes`, {
        method: 'POST',
        headers: {
            Authorization: `bearer ${process.env.STRAPI_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: JSON.parse(data)
        })
    })
    const res = await response.json();
    console.log('res add', res)
    return res?.data?.slug
}

export async function updateNote(uuid, data) {
    const { documentId: id } = await getNote(uuid);
    console.log(id, 'data', data)
    const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `bearer ${process.env.STRAPI_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: JSON.parse(data)
        })
    })
    const res = await response.json()
    console.log('res update', res)
    return res?.data?.slug
}

export async function getNote(uuid) {
    const response = await fetch(`http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${process.env.STRAPI_KEY}`,
            "Content-Type": "application/json"
        },
    })
    const data = await response.json();
    console.log('data fetch result:', data)
    return {
        title: data?.data?.[0]?.title,
        content: data?.data?.[0]?.content,
        updateTime: data?.data?.[0]?.updatedAt,
        documentId: data?.data?.[0]?.documentId,
        id: data?.data?.[0]?.id
    }
}

export async function delNote(uuid) {
    console.log('del note', uuid)
    const res = await getNote(uuid);
    const { documentId: id , } = res;
    console.log(id, 'del note id', res);
    const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `bearer ${process.env.STRAPI_KEY}`,
            "Content-Type": "application/json"
        }
    });
}