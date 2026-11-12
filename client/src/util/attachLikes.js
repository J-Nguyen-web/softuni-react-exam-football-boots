export function attachLikes(
    boots, 
    likesData,
    bootsIdField = '_id',
    likesBootsIdField = 'bootsId',
) {

    // likes count map
    const likesMap = likesData.reduce((acc, likes) => {
        // acc[likes.bootsId] = (acc[likes.bootsId] || 0) +1;
        const bootsId = likes[likesBootsIdField];
        acc[bootsId] = (acc[bootsId] || 0) + 1;

        return acc;
    }, {});

    // attach likes helper
    return boots.map(pairBoots => ({
            ...pairBoots,
            likes: likesMap[pairBoots[bootsIdField]] || 0
        }));
}

