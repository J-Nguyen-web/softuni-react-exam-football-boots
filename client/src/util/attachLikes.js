export function attachLikes(boots, likesData) {

    // likes count map
    const likesMap = likesData.reduce((acc, likes) => {
        acc[likes.bootsId] = (acc[likes.bootsId] || 0) +1;
        return acc;
    }, {});

    // attach likes helper
    return boots.map(pairBoots => ({
            ...pairBoots,
            likes: likesMap[pairBoots._id] || 0
        }));
}

