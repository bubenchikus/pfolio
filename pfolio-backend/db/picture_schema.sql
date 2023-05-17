CREATE TABLE picture (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) DEFAULT 'Untitled',
    about TEXT,
    category ENUM(
        'cg-paint-left',
        'cg-paint-right',
        'cg-graph',
        'trad',
        'comics',
        'no-category',
        'page'
    ) NOT NULL DEFAULT 'no-category',
    pictureName VARCHAR(255) NOT NULL,
    previewName VARCHAR(255) DEFAULT NULL,
    series VARCHAR(255) DEFAULT 'stand-alone',
    created VARCHAR(255),
    redraw BOOLEAN DEFAULT false,
    hide BOOLEAN DEFAULT false,
    UNIQUE(category, pictureName),
    UNIQUE(previewName)
);