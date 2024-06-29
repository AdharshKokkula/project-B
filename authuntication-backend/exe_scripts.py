import sqlite3

# Connect to SQLite database
conn = sqlite3.connect('appData.db')
cursor = conn.cursor()

# Create table
cursor.execute('''
CREATE TABLE IF NOT EXISTS work_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_src TEXT NOT NULL,
    job_title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    payment TEXT NOT NULL,
    deadline TEXT NOT NULL,
    posted_by TEXT NOT NULL,
    rating REAL NOT NULL
)
''')

# Data to insert
data = [
    ('works-images/gardening_work.jpg', 'Landscape Gardening', 'Gardening', 'We need an experienced gardener to design and implement a landscape garden in our backyard. The project includes planting, mulching, and installing a small water feature.', 'San Francisco, CA', 'Rs 500', 'July 10, 2024', 'John Doe', 4.5),
    ('works-images/painting_work.jpg', 'Painting', 'Art', 'Looking for a skilled painter to paint a mural on our office wall.', 'New York, NY', 'Rs 1000', 'August 1, 2024', 'Jane Smith', 4.7),
    ('works-images/software_work.jpg', 'Software Development', 'IT', 'Need a software developer to build a mobile application.', 'Austin, TX', 'Rs 2000', 'September 15, 2024', 'Alice Johnson', 4.8),
    ('works-images/writing_work.jpg', 'Content Writing', 'Writing', 'Looking for a content writer to create engaging blog posts for our website.', 'Los Angeles, CA', 'Rs 800', 'July 20, 2024', 'Michael Brown', 4.6),
    ('works-images/design_work.jpg', 'Graphic Design', 'Design', 'Need a graphic designer to create marketing materials for our new product launch.', 'Chicago, IL', 'Rs 1500', 'August 5, 2024', 'Emily Davis', 4.9),
    ('works-images/marketing_work.jpg', 'Digital Marketing', 'Marketing', 'Looking for a digital marketer to manage our social media campaigns.', 'Seattle, WA', 'Rs 1200', 'July 30, 2024', 'David Wilson', 4.4),
    ('works-images/data_analysis_work.jpg', 'Data Analysis', 'Data Science', 'Need a data analyst to analyze sales data and provide insights.', 'San Jose, CA', 'Rs 1800', 'August 10, 2024', 'Sophia Martinez', 4.7),
    ('works-images/photography_work.jpg', 'Photography', 'Photography', 'Looking for a photographer to capture high-quality images for our event.', 'Miami, FL', 'Rs 1000', 'July 25, 2024', 'James Anderson', 4.8)
]

# Insert data into table
cursor.executemany('''
INSERT INTO work_details (image_src, job_title, category, description, location, payment, deadline, posted_by, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
''', data)

# Commit changes and close connection
conn.commit()
conn.close()