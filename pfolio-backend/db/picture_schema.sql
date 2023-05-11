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
    ) DEFAULT 'no-category',
    pictureName VARCHAR(255) NOT NULL,
    series VARCHAR(255) DEFAULT 'stand-alone',
    previewUrl VARCHAR(255),
    created DATE,
    redraw BOOLEAN DEFAULT false,
    UNIQUE(category, pictureName)
);